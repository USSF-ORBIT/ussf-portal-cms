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
          id
          name
          type
        }
        tags {
          id
          name
        }
      }
    }
  }
  `

  test('returns results for mixed types', async () => {
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
        }),
      ])
    )
  })

  test('returns results by searching bookmark URL', async () => {
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

  test('returns results by searching keywords', async () => {
    /*
        Query String: 'FOO', case insensitive
        Search Fields Tested: Article.keywords, Bookmark.keywords
        Expected Results:
            publishedArticleData (ArticleResult)
            orders (BookmarkResult)
            surf (BookmarkResult)
        */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'FOO',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(3)
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __typename: 'BookmarkResult',
          id: expect.any(String),
          permalink: orders.url,
          preview: orders.description,
          title: orders.label,
        }),
        expect.objectContaining({
          __typename: 'BookmarkResult',
          id: expect.any(String),
          permalink: surf.url,
          preview: surf.description,
          title: surf.label,
        }),
        expect.objectContaining({
          __typename: 'ArticleResult',
          date: expect.any(String),
          id: expect.any(String),
          labels: [
            {
              id: expect.any(String),
              name: publishedArticleData.labels.create.name,
              type: publishedArticleData.labels.create.type,
            },
          ],
          permalink: publishedArticleData.slug,
          preview: publishedArticleData.preview,
          tags: [
            {
              id: expect.any(String),
              name: publishedArticleData.tags.create.name,
            },
          ],
          title: publishedArticleData.title,
        }),
      ])
    )
  })

  test('does not return articles with draft status', async () => {
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

  test('returns results by searching bookmark descriptions', async () => {
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

  test('returns results by searching article document body', async () => {
    /*
        Query String: 'lorem ipsum', case insensitive
        Search Fields Tested: Article.searchBody
        Expected Results:
          publishedArticleData (ArticleResult)
        */

    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'dolor sit amet',
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
          labels: [
            {
              id: expect.any(String),
              name: publishedArticleData.labels.create.name,
              type: publishedArticleData.labels.create.type,
            },
          ],
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

  test('returns filtered results by label', async () => {
    /*
        Query String: 'label:all guardians', case insensitive
        Search Fields Tested: Article.searchBody
        Expected Results:
          publishedArticleData (ArticleResult)
        */
    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'label:"All Guardians"',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(1)
  })

  test('returns filtered results by tag', async () => {
    /*
        Query String: 'label:all guardians', case insensitive
        Search Fields Tested: Article.searchBody
        Expected Results:
          publishedArticleData (ArticleResult)
        */
    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'tag:"Test Tag"',
      },
    })

    const results = searchResults.search

    expect(results).toHaveLength(1)
  })

  test('returns all results matching label and tag', async () => {
    /*
        Results can contain either tag or label, or both.
        
        Query String: 'label:"All Guardians" tag:"Lorem Tag"', case insensitive
        Search Fields Tested: Article.Labels, Article.Tags
        Expected Results:
          publishedArticleData (ArticleResult) (label:"All Guardians")
          publishedArticleWithMultipleTagsData (ArticleResult) (tag: "Lorem Tag")
        */
    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'label:"All Guardians" tag:"Lorem Tag"',
      },
    })

    const results = searchResults.search
    expect(results).toHaveLength(2)
  })

  test('returns results matching tag, label, and query', async () => {
    /*
      Results must contain query, can contain either tag or label, or both.
      Query String: 'label:"All Guardians" tag:"Lorem Tag" lorem ipsum', case insensitive
    Expected Results:
          publishedArticleData (ArticleResult) (label:"All Guardians" query: "lorem ipsum")
          publishedArticleWithMultipleTagsData (ArticleResult) (tag: "Lorem Tag", query: "lorem ipsum")
    */
    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'label:"All Guardians" tag:"Lorem Tag" lorem ipsum',
      },
    })

    const results = searchResults.search
    expect(results).toHaveLength(2)
  })

  test('returns results matching multiple tags', async () => {
    /*
      Results can contain either tag, or both.
      Query String: 'tag:"Lorem Tag" tag:"Test Tag"', case insensitive
    Expected Results:
          publishedArticleData (ArticleResult) (tag: "Test Tag")
          publishedArticleWithMultipleTagsData (ArticleResult) (tag: "Lorem Tag")
    */
    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'tag:"Lorem Tag" tag:"Test Tag"',
      },
    })

    const results = searchResults.search
    expect(results).toHaveLength(2)
  })

  test('returns results matching multiple labels', async () => {
    /*
        Results can contain either label, or both.
        Query String: 'label:"All Guardians" label: "Civilians", case insensitive
      Expected Results:
            publishedArticleData (ArticleResult) (label: "All Guardians")
            publishedArticleWithMultipleTagsData (ArticleResult) (tag: "Civilians")
      */
    const searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'label:"All Guardians" label:Civilians',
      },
    })

    const results = searchResults.search
    expect(results).toHaveLength(2)
  })
  test('returns results for a single category', async () => {
    /*
        Results must contain query and category
        Query String: 'category:application foo', case insensitive
      Expected Results:
            surf (BookmarkResult) (category:application, keyword: "foo")
            orders (BookmarkResult) (category:application, keyword: "foo")
      */
    // search for query 'bar' in category 'news' and get one result
    // search for query 'bar' without category and get two results
    let searchResults: SearchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'category:application foo',
      },
    })

    let results = searchResults.search

    expect(results).toHaveLength(2)

    /*
        Results must contain query and category
        Query String: 'category:news foo', case insensitive
      Expected Results:
            publishedArticleData (ArticleResult) (category:news, keyword: "foo")
      */
    searchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'category:news foo',
      },
    })

    results = searchResults.search

    expect(results).toHaveLength(1)

    /*
        Results must contain query and at least one category
        Query String: 'category:news category:application foo', case insensitive
      Expected Results:
            publishedArticleData (ArticleResult) (category:news, keyword: "foo")
            surf (BookmarkResult) (category:application, keyword: "foo")
            orders (BookmarkResult) (category:application, keyword: "foo")
      */
    searchResults = await sudoContext.graphql.run({
      query: searchQuery,
      variables: {
        query: 'category:news category:application foo',
      },
    })

    results = searchResults.search

    expect(results).toHaveLength(3)
  })
})
