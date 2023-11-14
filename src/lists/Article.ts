import { list, graphql } from '@keystone-6/core'
import {
  image,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { DateTime } from 'luxon'

import { withTracking } from '../util/tracking'
import { ARTICLE_STATUSES } from '../util/workflows'
import {
  canCreateArticle,
  canUpdateDeleteArticle,
  canPublishArchiveArticle,
  articleCreateView,
  articleItemView,
  articleStatusView,
} from '../util/access'
import { slugify } from '../util/formatting'
import { isLocalStorage } from '../util/getStorage'
import { componentBlocks } from '../components/embedVideo'

// NOTE:
// Disable the warning, this regex is only run after checking the max length
// and only failed with a catastrophic backtrace in testing with extremely
// large data sets well beyond the current max or anything a url would accept
// For details see https://github.com/USSF-ORBIT/ussf-portal/blob/main/docs/adr/0018-disable-unsafe-regex-in-cms-slug-code.md
// eslint-disable-next-line security/detect-unsafe-regex
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SLUG_MAX = 1000

export const ARTICLE_CATEGORIES = {
  INTERNAL_NEWS: 'InternalNews',
  ORBIT_BLOG: 'ORBITBlog',
  LANDING_PAGE: 'LandingPage',
} as const

type DocumentSubFieldJSON = {
  text?: string
  children?: Array<DocumentSubFieldJSON>
}

// Until Keystone supports full-text search of the document field, we're rolling our own 😎
// Whenever the body of an article is updated, this function parses
// the JSON, extracts the text fields, and returns an array to store
const parseSearchBody = (body: Array<DocumentSubFieldJSON>, arr: string[]) => {
  body.map((item) => {
    if (item?.text !== undefined) {
      return arr.push(item.text)
    }
    if (item.children) {
      return parseSearchBody(item.children, arr)
    }
  })
}

const Article = list(
  withTracking({
    access: {
      operation: {
        create: canCreateArticle,
        query: () => true,
        update: () => true,
        delete: () => true,
      },
      filter: {
        update: canUpdateDeleteArticle,
        delete: canUpdateDeleteArticle,
      },
    },

    ui: {
      labelField: 'title',
      hideCreate: ({ session }) => !canCreateArticle({ session }),
      hideDelete: ({ session }) => !canCreateArticle({ session }),
      createView: {
        defaultFieldMode: articleCreateView,
      },
      itemView: {
        defaultFieldMode: articleItemView,
      },
      listView: {
        initialColumns: ['title', 'status'],
      },
    },

    fields: {
      category: select({
        type: 'enum',
        options: Object.entries(ARTICLE_CATEGORIES).map(([, v]) => ({
          label: v,
          value: v,
        })),
        validation: {
          isRequired: true,
        },
      }),
      status: select({
        type: 'enum',
        options: Object.entries(ARTICLE_STATUSES).map(([, v]) => ({
          label: v,
          value: v,
        })),
        defaultValue: ARTICLE_STATUSES.DRAFT,
        validation: {
          isRequired: true,
        },
        access: {
          create: () => false,
          update: canPublishArchiveArticle,
        },
        ui: {
          displayMode: 'segmented-control',
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: articleStatusView,
          },
        },
        hooks: {
          resolveInput: async ({ inputData, item, resolvedData }) => {
            if (
              inputData.publishedDate &&
              (inputData.status !== ARTICLE_STATUSES.PUBLISHED ||
                item?.status !== ARTICLE_STATUSES.PUBLISHED)
            ) {
              // Set status if publishedDate is being changed and status is not changed or not already Published
              return ARTICLE_STATUSES.PUBLISHED
            }
            return resolvedData.status
          },
        },
      }),
      articlePreviewUrl: virtual({
        // This field is a bit of a work around it uses the resolve function of a virtual
        // field to create a JSON payload used by the custom view defined to display a
        // Preview button that opens a new tab to the article being modified.
        field: graphql.field({
          type: graphql.JSON,
          resolve(item) {
            const isPublished =
              item.status === ARTICLE_STATUSES.PUBLISHED &&
              (item.publishedDate as DateTime) <= DateTime.now()
            const label = isPublished ? 'View Article' : 'Preview Article'
            const description =
              'Be sure to save changes before previewing your article.'
            return JSON.stringify({
              articlePreviewUrl: `${process.env.PORTAL_URL}/articles/${item.slug}`,
              label,
              isPublished,
              description,
            })
          },
        }),
        ui: {
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: () => 'read',
          },
          views: './src/article-preview-button/views.tsx',
        },
      }),
      publishedDate: timestamp({
        access: {
          create: () => false,
          update: canPublishArchiveArticle,
        },
        ui: {
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: articleStatusView,
          },
        },
        hooks: {
          resolveInput: async ({ inputData, item, resolvedData }) => {
            if (
              inputData.status === ARTICLE_STATUSES.PUBLISHED &&
              item?.status !== ARTICLE_STATUSES.PUBLISHED &&
              !inputData.publishedDate
            ) {
              // Set publishedDate if status is being changed to "Published"
              // only set publishedDate if they didn't set one
              return DateTime.now().toJSDate()
            }
            return resolvedData.publishedDate
          },
          validateInput: async ({
            operation,
            inputData,
            resolvedData,
            addValidationError,
          }) => {
            if (operation === 'update' && inputData.publishedDate) {
              const publishedDate = DateTime.fromJSDate(
                resolvedData.publishedDate
              )
              // if the selected publish date is in the past it is invalid
              // but if it's recent then allow it since they could have been
              // editing the page for this amount of time after setting
              // date and saving
              if (publishedDate < DateTime.now().minus({ hours: 4 })) {
                addValidationError('Published date cannot be in the past')
              }
            }
          },
        },
      }),
      archivedDate: timestamp({
        access: {
          create: () => false,
          update: () => false,
        },
        ui: {
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: () => 'read',
          },
        },
        hooks: {
          resolveInput: async ({ inputData, item, resolvedData }) => {
            if (
              inputData.status === ARTICLE_STATUSES.ARCHIVED &&
              item?.status !== ARTICLE_STATUSES.ARCHIVED
            ) {
              // Set archivedDate if status is being changed to "Archived"
              return DateTime.now().toJSDate()
            }
            return resolvedData.archivedDate
          },
        },
      }),
      slug: text({
        isIndexed: 'unique',
        validation: {
          length: {
            max: SLUG_MAX,
          },
        },
        hooks: {
          resolveInput: async ({ resolvedData, operation }) => {
            if (operation === 'create' && !resolvedData.slug) {
              // Default slug to the slugified title
              // This can still cause validation errors bc titles don't have to be unique
              return slugify(resolvedData.title)
            }

            return resolvedData.slug
          },
          validateInput: async ({
            operation,
            inputData,
            fieldKey,
            resolvedData,
            addValidationError,
          }) => {
            // eslint-disable-next-line no-prototype-builtins
            if (operation === 'create' || inputData.hasOwnProperty(fieldKey)) {
              // Validate slug - this has to be done in a hook to allow creating an article with no slug
              // NOTE: Need to check SLUG_MAX frist to avoid a DOS attack based on the regex see note above.
              const slug = resolvedData.slug
              if (!slug) {
                addValidationError('Slug is a required value')
              } else if (slug.length > SLUG_MAX) {
                addValidationError(
                  `Slug is too long (maximum of ${SLUG_MAX} characters)`
                )
              } else if (!SLUG_REGEX.test(slug)) {
                addValidationError(
                  'Slug must be a valid slug (only alphanumeric characters and dashes allowed)'
                )
              }
            }
          },
        },
      }),
      title: text({
        validation: {
          isRequired: true,
        },
      }),
      preview: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      hero: image({
        storage: isLocalStorage() ? 'local_images' : 'cms_images',
      }),
      body: document({
        formatting: true,
        dividers: true,
        links: true,
        ui: {
          views: './src/components/embedVideo',
        },
        componentBlocks,
      }),
      searchBody: text({
        ui: {
          itemView: {
            fieldMode: 'hidden',
          },
          createView: {
            fieldMode: 'hidden',
          },
        },
        hooks: {
          resolveInput: async ({ resolvedData }) => {
            // If the body field has been updated, parse it and return it as the new searchBody value
            if (resolvedData.body) {
              const results: string[] = []
              parseSearchBody(resolvedData.body, results)
              return results.join(' ')
            }
            return resolvedData.body
          },
        },
      }),

      keywords: text({
        ui: {
          displayMode: 'textarea',
        },
        isFilterable: true,
      }),
      byline: relationship({
        ref: 'Byline',
        ui: {
          hideCreate: true,
        },
      }),
      location: relationship({
        ref: 'Location',
        ui: {
          hideCreate: true,
        },
      }),
      labels: relationship({
        ref: 'Label',
        many: true,
        ui: {
          hideCreate: true,
        },
      }),
      tags: relationship({
        ref: 'Tag',
        many: true,
      }),
    },
  })
)

export default Article
