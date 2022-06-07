import { graphQLSchemaExtension } from '@keystone-6/core'
import type { Context } from '.keystone/types'

export const SearchSchema = graphQLSchemaExtension<Context>({
  typeDefs: `
        type Query {
            """ Search """
            search(query: String!): [SearchResultItem]
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
    `,
  resolvers: {
    Query: {
      search: async (root, { query }, { session, db, prisma }) => {
        // Split our terms and search for each one using OR
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
