import { list } from '@keystone-6/core'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import type { Lists } from '.keystone/types'

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

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SLUG_MAX = 1000

const ARTICLE_CATEGORIES = {
  INTERNAL_NEWS: 'InternalNews',
  ORBIT_BLOG: 'ORBITBlog',
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

const Article: Lists.Article = list(
  withTracking({
    access: {
      operation: {
        create: canCreateArticle,
        query: () => true,
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
        options: (
          Object.keys(ARTICLE_CATEGORIES) as Array<
            keyof typeof ARTICLE_CATEGORIES
          >
        ).map((r) => ({
          label: ARTICLE_CATEGORIES[r],
          value: ARTICLE_CATEGORIES[r],
        })),
        validation: {
          isRequired: true,
        },
      }),
      status: select({
        type: 'enum',
        options: (
          Object.keys(ARTICLE_STATUSES) as Array<keyof typeof ARTICLE_STATUSES>
        ).map((s) => ({
          label: ARTICLE_STATUSES[s],
          value: ARTICLE_STATUSES[s],
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
      }),
      slug: text({
        isIndexed: 'unique',
        validation: {
          length: {
            max: SLUG_MAX,
          },
        },
        hooks: {
          resolveInput: async ({ fieldKey, resolvedData, operation }) => {
            if (operation === 'create' && !resolvedData.slug) {
              // Default slug to the slugified title
              // This can still cause validation errors bc titles don't have to be unique
              return slugify(resolvedData.title)
            }

            return resolvedData[fieldKey]
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
              const slug = resolvedData[fieldKey]
              if (!slug) {
                addValidationError('Slug is a required value')
              } else if (!SLUG_REGEX.test(slug)) {
                addValidationError(
                  'Slug must be a valid slug (only alphanumeric characters and dashes allowed)'
                )
              } else if (slug.length > SLUG_MAX) {
                addValidationError(
                  `Slug is too long (maximum of ${SLUG_MAX} characters)`
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
      body: document({
        formatting: true,
        dividers: true,
        links: true,
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
          },
        },
      }),

      keywords: text({
        ui: {
          displayMode: 'textarea',
        },
        isFilterable: true,
      }),
      publishedDate: timestamp({
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

    hooks: {
      resolveInput: async ({ inputData, item, resolvedData }) => {
        // Workflow side effects
        if (
          inputData.status === ARTICLE_STATUSES.ARCHIVED &&
          item?.status !== ARTICLE_STATUSES.ARCHIVED
        ) {
          // Set archivedDate if status is being changed to "Archived"
          resolvedData.archivedDate = new Date()
        } else if (
          inputData.status === ARTICLE_STATUSES.PUBLISHED &&
          item?.status !== ARTICLE_STATUSES.PUBLISHED
        ) {
          // Set publishedDate if status is being changed to "Published"
          resolvedData.publishedDate = new Date()
        }

        return resolvedData
      },
    },
  })
)

export default Article
