import { mergeSchemas } from '@graphql-tools/schema'
import { PrismaClient } from '@prisma/client'
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
          // Organize tags, labels, and terms
          const tags: string[] = []
          const labels: string[] = []
          let terms: string[] = []

          // Filtering v1 - Support list pages for a single tag or label
          // #TODO extend search to support multiple tags and labels in filtered view

          const filter = query.split(':')

          if (filter[0] === 'tag') {
            tags.push(filter[1])
          }
          if (filter[0] === 'label') {
            labels.push(filter[1])
          }

          if (tags.length > 0 && labels.length === 0) {
            const tagResults = await filterArticlesByTags(tags, prisma)
            return tagResults
          }
          if (labels.length > 0 && tags.length === 0) {
            const labelResults = await filterArticlesByLabels(labels, prisma)
            return labelResults
          }

          // If there wasn't a single filter or label, continue with search
          terms = query.split(' ').join('|')

          // Search Bookmark table
          // Fields: label, url, description, keywords
          const bookmarkResults = (
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

          // Search Article table
          // Fields: title, preview, keywords, labels, tags, searchBody
          const articleResults = (
            await prisma.article.findMany({
              where: {
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
            })
          ).map((article: any) => articleResult(article))

          return [...bookmarkResults, ...articleResults]
        },
      },
    },
  })

const filterArticlesByTags = async (tags: string[], prisma: PrismaClient) => {
  const tagResults = (
    await prisma.article.findMany({
      where: {
        tags: {
          some: {
            name: {
              in: tags,
              mode: 'insensitive',
            },
          },
        },
      },
    })
  ).map((article: any) => articleResult(article))

  return tagResults
}

const filterArticlesByLabels = async (
  labels: string[],
  prisma: PrismaClient
) => {
  const labelResults = (
    await prisma.article.findMany({
      where: {
        labels: {
          some: {
            name: {
              in: labels,
              mode: 'insensitive',
            },
          },
        },
      },
    })
  ).map((article: any) => articleResult(article))

  return labelResults
}
