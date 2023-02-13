import { KeystoneContext } from '@keystone-6/core/types'

import {
  myVector,
  publishedArticleData,
  searchTermArticleData,
  surf,
  orders,
  testArticles,
  testBookmarks,
} from '../testData'

import { configTestEnv } from '../testHelpers'

let sudoContext: KeystoneContext

beforeAll(async () => {
  const context = await configTestEnv()
  sudoContext = context.sudoContext
  await sudoContext.query.Article.createMany({ data: testArticles })
  await sudoContext.query.Bookmark.createMany({ data: testBookmarks })
})

type SearchResults = {
  search: []
}

describe('Search Resolver', () => {
  // Define the search query we'll use in every request
  const searchQuery = `
  query Search($query: String!) {
    search(query: $query) {
      __typename
      id
      title
      preview
      permalink
      ... on ArticleResult {
        date
        labels {
          name
          type
        }
      }
    }
  }
  `

  it('returns results for mixed types', async () => {
    /*
    Query String: 'myvector', case insensitive
    Search Fields Tested: 
        Article.title, Article.slug, Article.preview
        Bookmark.label, bookmark.url
    Expected Results: 
        myVector (BookmarkResult)
        searchTermArticleData (ArticleResult)
    
    */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'myvector',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(2)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __typename: 'BookmarkResult',
          title: myVector.label,
          permalink: myVector.url,
          preview: myVector.description,
        }),
        expect.objectContaining({
          __typename: 'ArticleResult',
          title: searchTermArticleData.title,
          permalink: searchTermArticleData.slug,
          preview: searchTermArticleData.preview,
          date: expect.any(String),
          labels: [],
        }),
      ])
    )
  })

  it('returns results by searching bookmark URL', async () => {
    /*
        Query String: 'afpcsecure.us.af.mil'
        Search Fields Tested: Bookmark.url
        Expected Results:
            surf (BookmarkResult)
            orders (BookmarkResult)
        */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'afpcsecure.us.af.mil',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(2)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __typename: 'BookmarkResult',
          title: surf.label,
          permalink: surf.url,
          preview: surf.description,
        }),
        expect.objectContaining({
          __typename: 'BookmarkResult',
          title: orders.label,
          permalink: orders.url,
          preview: orders.description,
        }),
      ])
    )
  })

  it('returns results by searching keywords', async () => {
    /*
        Query String: 'FOO', case insensitive
        Search Fields Tested: Article.keywords, Bookmark.keywords
        Expected Results:
            publishedArticleData (ArticleResult)
            orders (BookmarkResult)
        */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'FOO',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(2)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __typename: 'ArticleResult',
          title: publishedArticleData.title,
          permalink: publishedArticleData.slug,
          preview: publishedArticleData.preview,
          labels: [publishedArticleData.labels.create],
          date: expect.any(String),
        }),
        expect.objectContaining({
          __typename: 'BookmarkResult',
          title: orders.label,
          permalink: orders.url,
          preview: orders.description,
        }),
      ])
    )
  })

  it('does not return articles with draft status', async () => {
    /*
        Query String: 'draft', case insensitive
        Search Fields Tested: Article.status
        Expected Results: []
        */
    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'draft',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(0)
  })

  it('returns results by searching bookmark descriptions', async () => {
    /*
        Query String: 'career', case insensitive
        Search Fields Tested: Bookmark.description
        Expected Results:
            myVector (BookmarkResult)
            surf (BookmarkResult)
        */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'career',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(2)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __typename: 'BookmarkResult',
          title: surf.label,
          permalink: surf.url,
          preview: surf.description,
        }),
        expect.objectContaining({
          __typename: 'BookmarkResult',
          title: myVector.label,
          permalink: myVector.url,
          preview: myVector.description,
        }),
      ])
    )
  })

  it('returns results by searching article document body', async () => {
    /*
        Query String: 'lorem ipsum', case insensitive
        Search Fields Tested: Article.searchBody
        Expected Results:
          publishedArticleData (ArticleResult)
        */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'lorem ipsum',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(1)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __typename: 'ArticleResult',
          title: publishedArticleData.title,
          permalink: publishedArticleData.slug,
          preview: publishedArticleData.preview,
          labels: [publishedArticleData.labels.create],
          date: expect.any(String),
        }),
      ])
    )
  })

  test('does not return scheduled articles, ie with a published date in the future', async () => {
    /*
        Query String: 'in the future', case insensitive
        The sample data in src/testData.ts has the above terms in the article body with a publishedDate in the future.
        Search Fields Tested: Article.searchBody
        Expected Results: []
        */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'in the future',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(0)
  })
})
