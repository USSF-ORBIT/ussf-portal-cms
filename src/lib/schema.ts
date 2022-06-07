import { gql, graphQLSchemaExtension } from '@keystone-6/core'
import type { Context } from '.keystone/types'

// typeDefs for custom functionality
// Any GraphQL extensions can be added here
const typeDefs = gql`
  extend type Query {
    """
    Search
    """
    search(query: String!): [SearchResultItem]
    """
    Authenticated Item
    """
    authenticatedItem: AuthenticatedItem
  }

  enum SearchResultItemType {
    Article
    Bookmark
  }

  type SearchResultItem {
    type: SearchResultItemType
    title: String!
    url: String!
    description: String!
  }

  union AuthenticatedItem = User
`

// Any custom GraphQL resolvers can be added here
export const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs,
  resolvers: {
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
          type: 'Bookmark',
          title: bookmark.label,
          url: bookmark.url,
          description: bookmark.description,
        }))

        // Search Article table
        // Fields: title, preview, keywords
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
            },
          })
        ).map((article) => ({
          type: 'Article',
          title: article.title,
          url: article.slug,
          description: article.preview,
        }))

        return [...bookmarkResults, ...articleResults]
      },
    },
  },
})
