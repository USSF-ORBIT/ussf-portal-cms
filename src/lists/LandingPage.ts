import { graphql, list } from '@keystone-6/core'
import { relationship, text, virtual } from '@keystone-6/core/fields'
import { withTracking } from '../util/tracking'
import { slugify } from '../util/formatting'
import { isAdmin } from '../util/access'

// NOTE:
// Disable the warning, this regex is only run after checking the max length
// and only failed with a catastrophic backtrace in testing with extremely
// large data sets well beyond the current max or anything a url would accept
// For details see https://github.com/USSF-ORBIT/ussf-portal/blob/main/docs/adr/0018-disable-unsafe-regex-in-cms-slug-code.md
// eslint-disable-next-line security/detect-unsafe-regex
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SLUG_MAX = 1000

const LandingPage = list(
  withTracking({
    access: {
      operation: {
        create: isAdmin,
        query: () => true,
        update: isAdmin,
        delete: isAdmin,
      },
      filter: {
        update: isAdmin,
        delete: isAdmin,
      },
    },
    ui: {
      hideCreate: () => false,
      hideDelete: () => false,
      label: 'Landing Page',
      createView: {
        defaultFieldMode: 'edit',
      },
      itemView: {
        defaultFieldMode: 'edit',
      },
    },

    fields: {
      pageTitle: text({
        validation: {
          isRequired: true,
        },
      }),
      // Slug field is copied over from Article
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
              return slugify(resolvedData.pageTitle)
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
      pageDescription: text({
        ui: {
          displayMode: 'textarea',
        },
      }),

      articles: virtual({
        field: graphql.field({
          type: graphql.list(
            graphql.object<{
              id: string
              title: string
              slug: string
              preview: string
              publishedDate: string
              labels: { id: string; name: string }[]
            }>()({
              name: 'FilteredArticles',
              fields: {
                id: graphql.field({ type: graphql.String }),
                title: graphql.field({ type: graphql.String }),
                slug: graphql.field({ type: graphql.String }),
                preview: graphql.field({ type: graphql.String }),
                publishedDate: graphql.field({ type: graphql.String }),
                labels: graphql.field({
                  type: graphql.list(
                    graphql.object<{ id: string; name: string }>()({
                      name: 'ArticleLabel',
                      fields: {
                        id: graphql.field({ type: graphql.String }),
                        name: graphql.field({ type: graphql.String }),
                      },
                    })
                  ),
                }),
              },
            })
          ),

          async resolve(item, _, context) {
            const articles = await context.query.Article.findMany({
              where: {
                tags: { some: { id: { equals: item.articleTagId } } },
              },
              query: 'id title slug preview publishedDate labels { id name }',
            })

            return articles.map((article) => ({
              id: article.id,
              title: article.title,
              slug: article.slug,
              preview: article.preview,
              publishedDate: article.publishedDate,
              labels: article.labels,
            }))
          },
        }),
        ui: {
          itemView: {
            fieldMode: () => 'read',
          },
          createView: {
            fieldMode: () => 'hidden',
          },
          query: '{ id title slug }',
          views: './src/components/landingPageArticles.tsx',
        },
      }),
      articleTag: relationship({
        ref: 'Tag',
        many: false,
      }),
      documents: relationship({
        ref: 'DocumentSection',
        many: true,
      }),
      collections: relationship({
        ref: 'Collection',
        many: true,
      }),
    },
  })
)

export default LandingPage
