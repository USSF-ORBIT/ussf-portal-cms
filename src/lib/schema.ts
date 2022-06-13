import { gql, graphQLSchemaExtension } from '@keystone-6/core'
import type { Context } from '.keystone/types'

// typeDefs for custom functionality
// Any GraphQL extensions can be added here
const typeDefs = gql`
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
  }

  union AuthenticatedItem = User
`

// Any custom GraphQL resolvers can be added here
export const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs,
  resolvers: {
    SearchResultItem: {
      __resolveType(obj) {
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
        // Split our terms and search for each one using OR to maximize results
        const terms = query.split(' ').join('|')

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
        ).map((bookmark) => ({
          id: bookmark.id,
          type: 'Bookmark',
          title: bookmark.label,
          permalink: bookmark.url,
          preview: bookmark.description,
        }))

        // Search Article table
        // Fields: title, preview, keywords, labels, tags
        // #TODO: Add field searchBody
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
              ],
              status: 'Published',
              category: 'InternalNews',
            },

            include: {
              labels: true,
              tags: true,
            },
          })
        ).map((article) => ({
          id: article.id,
          type: 'Article',
          title: article.title,
          permalink: article.slug,
          preview: article.preview,
          labels: article.labels,
          date: article.publishedDate?.toISOString(),
        }))

        return [...bookmarkResults, ...articleResults]
      },
    },
  },
})
