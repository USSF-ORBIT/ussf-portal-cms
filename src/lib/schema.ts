import { mergeSchemas } from '@graphql-tools/schema'
import {
  ArticleSearchResult,
  BookmarkSearchResult,
  DocumentationSearchResult,
  ArticleQueryResult,
  BookmarkQueryResult,
  DocumentationPageQueryResult,
  DocumentQueryResult,
} from '../../types'
import {
  parseSearchQuery,
  buildArticleQuery,
  buildBookmarkQuery,
  buildDocumentQuery,
  buildDocumentationPageQuery,
} from './search'

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
    Documentation
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

  type DocumentationResult implements SearchResultItem {
    id: String!
    title: String!
    type: SearchResultType!
    preview: String!
    permalink: String!

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
          if (obj.type === 'Documentation') return 'DocumentationResult'
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

          const CATEGORIES = {
            ARTICLE: 'news',
            BOOKMARK: 'application',
            DOCUMENTATION: 'documentation',
          }
          const { terms, tags, labels, categories } = parseSearchQuery(query)

          let bookmarkResults: BookmarkSearchResult[] = []
          let articleResults: ArticleSearchResult[] = []
          let documentationPageResults: DocumentationSearchResult[] = []
          let documentResults: DocumentationSearchResult[] = []

          const tablesToSearch = [
            {
              // If tags or labels, or category:news is specified, we want to search articles
              [CATEGORIES.ARTICLE]:
                categories.includes(CATEGORIES.ARTICLE) ||
                labels.length > 0 ||
                tags.length > 0 ||
                categories.length === 0,
            },
            {
              // If no tags or labels, or category:application, we want to search bookmarks
              [CATEGORIES.BOOKMARK]:
                categories.includes(CATEGORIES.BOOKMARK) ||
                (labels.length === 0 &&
                  tags.length === 0 &&
                  categories.length === 0),
            },
            {
              // If no tags or labels, or category is documentation, we want to search docs
              [CATEGORIES.DOCUMENTATION]:
                categories.includes(CATEGORIES.DOCUMENTATION) ||
                (labels.length === 0 &&
                  tags.length === 0 &&
                  categories.length === 0),
            },
          ]

          // Search all tables and add results to the appropriate array
          await Promise.all(
            tablesToSearch.map(async (c) => {
              if (c[CATEGORIES.ARTICLE]) {
                const articleQuery = buildArticleQuery(terms, tags, labels)

                articleResults = (
                  await prisma.article.findMany({
                    ...articleQuery,
                  })
                ).map((article: ArticleQueryResult) => ({
                  id: article.id,
                  type: 'Article',
                  title: article.title,
                  permalink: article.slug,
                  preview: article.preview,
                  labels: article.labels,
                  tags: article.tags,
                  date: article.publishedDate?.toISOString(),
                }))
              }

              if (c[CATEGORIES.BOOKMARK]) {
                bookmarkResults = (
                  await prisma.bookmark.findMany({
                    ...buildBookmarkQuery(terms),
                  })
                ).map((bookmark: BookmarkQueryResult) => ({
                  id: bookmark.id,
                  type: 'Bookmark',
                  title: bookmark.label,
                  permalink: bookmark.url,
                  preview: bookmark.description,
                }))
              }

              if (c[CATEGORIES.DOCUMENTATION]) {
                documentationPageResults =
                  // Technically there should only be one page, but there could be more in the future
                  (
                    await prisma.documentsPage.findMany({
                      ...buildDocumentationPageQuery(terms),
                    })
                  ).map((doc: DocumentationPageQueryResult) => ({
                    id: doc.id,
                    type: 'Documentation',
                    title: doc.pageTitle,
                    permalink: '/ussf-documentation',
                    // #TODO If we are going to allow more dynamic pages in the future, we need to add a permalink to the page model

                    preview: doc.sections[0].title,
                  }))

                // We also should search the documents themselves
                documentResults = (
                  await prisma.document.findMany({
                    ...buildDocumentQuery(terms),
                  })
                ).map((doc: DocumentQueryResult) => {
                  return {
                    id: doc.id,
                    type: 'Documentation',
                    title: doc.title,
                    permalink: '/ussf-documentation',
                    // #TODO Consider adding an anchor tag to the document page so the link can jump to the correct section to give it added value
                    preview: doc.description,
                  }
                })
              }
            })
          )

          // Return all search results
          // bookmarkResults maps to Application
          // articleResults maps to News
          // documentationResults and documentResults map to Documentation
          return [
            ...bookmarkResults,
            ...articleResults,
            ...documentationPageResults,
            ...documentResults,
          ]
        },
      },
    },
  })
