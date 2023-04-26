import { mergeSchemas } from '@graphql-tools/schema'
import { DateTime } from 'luxon'

// typeDefs for custom functionality
// Any GraphQL extensions can be added here
const typeDefs = `
  extend type Query {
    search(query: String!): [SearchResultItem]
    authenticatedItem: AuthenticatedItem
  }

  enum SearchResultType {
    Article
    Bookmark
  }

  interface SearchResultItem {
    id: String!
    title: String!
    preview: String!
    type: SearchResultType!
    permalink: String!
  }

  type BookmarkResult implements SearchResultItem {
    id: String!
    title: String!
    preview: String!
    type: SearchResultType!
    permalink: String!
  }

  type ArticleResult implements SearchResultItem {
    id: String!
    title: String!
    preview: String!
    type: SearchResultType!
    permalink: String!
    date: String!
    labels: [Label]
    tags: [Tag]
  }

  union AuthenticatedItem = User
`
const articleResult = (article: any) => ({
  id: article.id,
  type: 'Article',
  title: article.title,
  permalink: article.slug,
  preview: article.preview,
  labels: article.labels,
  tags: article.tags,
  date: article.publishedDate?.toISOString(),
})
// Any custom GraphQL resolvers can be added here
export const extendGraphqlSchema = (schema: any) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs,
    resolvers: {
      SearchResultItem: {
        __resolveType(obj: any) {
          if (obj.type === 'Bookmark') return 'BookmarkResult'
          if (obj.type === 'Article') return 'ArticleResult'
          return null
        },
      },
      Query: {
        authenticatedItem: async (root, args, { session, db }) => {
          if (typeof session?.userId === 'string') {
            const user = await db.User.findOne({
              where: { userId: session.userId },
            })

            return {
              __typename: 'User',
              listKey: 'User',
              label: user.userId,
              itemId: user.id,
              ...user,
            }
          }

          return null
        },

        search: async (_, { query }, { prisma }) => {
          // Convert search query into usable data structures for our database query
          // terms: string
          // tags: string[]
          // labels: string[]
          const { terms, tags, labels } = parseSearchQuery(query)

          // If terms were passed, search bookmarks
          // #TODO we also need to search for category, so bookmarks might get its own query builder to match articles
          // Fields: description, label, url, keywords
          let bookmarkResults = []
          if (terms.length > 0) {
            bookmarkResults = (
              await prisma.bookmark.findMany({
                where: {
                  OR: [
                    {
                      description: {
                        search: terms,
                        mode: 'insensitive',
                      },
                    },
                    {
                      label: {
                        search: terms,
                        mode: 'insensitive',
                      },
                    },
                    {
                      url: {
                        contains: terms,
                        mode: 'insensitive',
                      },
                    },
                    {
                      keywords: {
                        search: terms,
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              })
            ).map((bookmark: any) => ({
              id: bookmark.id,
              type: 'Bookmark',
              title: bookmark.label,
              permalink: bookmark.url,
              preview: bookmark.description,
            }))
          }

          // Search Article table
          // Fields: title, preview, keywords, labels, tags, searchBody

          const articleQuery = buildQuery(terms, tags, labels)

          const articleResults = (
            await prisma.article.findMany({
              ...articleQuery,
            })
          ).map((article: any) => articleResult(article))

          // Return all search results
          return [...bookmarkResults, ...articleResults]
        },
      },
    },
  })

const buildQuery = (terms?: string, tags?: string[], labels?: string[]) => {
  // We need to build our query based on any possible combination of tags, labels, and search terms

  const tagsQuery = {
    tags: {
      some: {
        name: {
          in: tags,
          mode: 'insensitive',
        },
      },
    },
  }

  const labelsQuery = {
    labels: {
      some: {
        name: {
          in: labels,
          mode: 'insensitive',
        },
      },
    },
  }

  const termsQuery = {
    OR: [
      {
        title: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        preview: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        keywords: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        searchBody: {
          search: terms,
          mode: 'insensitive',
        },
      },
    ],
  }

  const query = {
    where: {
      status: 'Published',
      publishedDate: {
        lte: DateTime.now().toJSDate(),
      },
      category: 'InternalNews',
    },
    include: {
      labels: true,
      tags: true,
    },
  }

  if (terms) {
    query.where = {
      ...query.where,
      ...termsQuery,
    }
  }

  if (tags && tags.length > 0) {
    query.where = {
      ...query.where,
      ...tagsQuery,
    }
  }

  if (labels && labels.length > 0) {
    query.where = {
      ...query.where,
      ...labelsQuery,
    }
  }

  return query
}

const parseSearchQuery = (query: string) => {
  const tags: string[] = []
  const labels: string[] = []
  const q: string[] = []
  let result

  // Regex to match tags, labels, and search terms
  // Supported formats:
  // tag:"tag name" OR tag:tagname
  // label:"label name" OR label:labelname
  // Any other text after is considered a search term

  const re = /((tag|label):(("*(\w*\s*)+")|(\w*\s*)))|(.+)/gim

  // In order to get all matches, we need to run the regex.exec() method in a loop
  while ((result = re.exec(query)) !== null) {
    // result[2] captures the tag or label keyword
    // result[3] captures the value of the tag or label
    // result[0] captures the search terms (if any)

    // Before storing, strip out any quotes and trim whitespace from values

    if (result[2] === 'tag') {
      tags.push(normalizeString(result[3]))
    } else if (result[2] === 'label') {
      labels.push(normalizeString(result[3]))
    } else {
      q.push(normalizeString(result[0]))
    }
  }

  const terms = () => {
    let t
    if (q.length > 0) {
      // Currently we're joining the search terms with an OR operator
      // #TODO further optimize search results
      t = q[0].split(' ').join('|')
    } else {
      // If there are no search terms, return an empty string
      t = ''
    }
    return t
  }

  return { terms: terms(), tags, labels }
}

const normalizeString = (str: string) => {
  return str.replace(/['"]+/g, '').trim().toLowerCase()
}
