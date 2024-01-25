import { DateTime } from 'luxon'
import type {
  ParsedSearchQuery,
  ArticleQuery,
  LandingPageQuery,
} from '../../types'

export const buildBookmarkQuery = (terms?: string) => ({
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

export const buildArticleQuery = (
  terms?: string,
  tags?: string[],
  labels?: string[]
) => {
  // Building blocks of the Article query
  // We can have tags, labels, terms, or any combination of the three
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

  // Establish the base query
  const query: ArticleQuery = {
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

  if (terms && terms.length > 0) {
    query.where.AND = [termsQuery, { OR: [] }]
  } else {
    query.where.OR = []
  }

  if (tags && tags.length > 0) {
    if (terms) {
      query.where.AND?.[1].OR?.push(tagsQuery)
    } else {
      query.where.OR?.push(tagsQuery)
    }
  }

  if (labels && labels.length > 0) {
    if (terms) {
      query.where.AND?.[1].OR?.push(labelsQuery)
    } else {
      query.where.OR?.push(labelsQuery)
    }
  }

  return query
}

export const buildDocumentationPageQuery = (terms?: string) => ({
  include: {
    sections: true,
  },
  where: {
    OR: [
      {
        pageTitle: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        sections: {
          some: {
            title: {
              search: terms,
              mode: 'insensitive',
            },
          },
        },
      },
    ],
  },
})

export const buildDocumentQuery = (terms?: string) => ({
  where: {
    OR: [
      {
        title: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        file_filename: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        description: {
          search: terms,
          mode: 'insensitive',
        },
      },
    ],
  },
})

export const buildLandingPageQuery = (terms?: string, tags?: string[]) => {
  // Building blocks of the LandingPage query
  // We can have tags, labels, terms, or any combination of the three
  const tagsQuery = {
    articleTag: {
      is: {
        name: {
          in: tags,
          mode: 'insensitive',
        },
      },
    },
  }

  const termsQuery = {
    OR: [
      {
        pageTitle: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        pageDescription: {
          search: terms,
          mode: 'insensitive',
        },
      },
      {
        slug: {
          search: terms,
          mode: 'insensitive',
        },
      },
    ],
  }

  // Establish the base query
  const query: LandingPageQuery = {
    where: {
      status: 'Published',
      publishedDate: {
        lte: DateTime.now().toJSDate(),
      },
    },

    include: {
      articleTag: true,
    },
  }

  if (terms && terms.length > 0) {
    query.where.AND = [termsQuery, { OR: [] }]
  } else {
    query.where.OR = []
  }

  if (tags && tags.length > 0) {
    if (terms) {
      query.where.AND?.[1].OR?.push(tagsQuery)
    } else {
      query.where.OR?.push(tagsQuery)
    }
  }

  return query
}

export const parseSearchQuery = (query: string): ParsedSearchQuery => {
  const tags: string[] = []
  const labels: string[] = []
  const q: string[] = []
  const categories: string[] = []
  let result

  // 200 character limit for search query
  if (query.length > 200) {
    query = query.substring(0, 200)
  }

  // Regex to match tags, labels, and search terms
  // Supported formats:
  //    tag:"tag name"
  //    tag:tagname
  //    label:"label name"
  //    label:labelname
  // Any following text considered search terms
  const re =
    // We are limiting the string input to 200 characters, so we can safely ignore the eslint warning
    // against catastrophic backtracking. If we were to remove the limit, we'd need
    // a specific string of more than 75,000 characters to trigger the issue.

    // eslint-disable-next-line security/detect-unsafe-regex
    /(?:(category|label|tag)):(?:(?:"([^"]+)")|(\w+))|(\w+\b(?:\s\w+\b)*)/gi

  // In order to get all matches, we need to run the regex.exec() method in a loop
  while ((result = re.exec(query)) !== null) {
    const keyword = result[1]
    const valueInQuotes = result[2]
    const valueWithoutQuotes = result[3]
    const searchTerms = result[0]

    if (keyword === 'tag') {
      tags.push(normalizeString(valueInQuotes || valueWithoutQuotes))
    } else if (keyword === 'label') {
      labels.push(normalizeString(valueInQuotes || valueWithoutQuotes))
    } else if (keyword === 'category') {
      categories.push(normalizeString(valueInQuotes || valueWithoutQuotes))
    } else {
      q.push(normalizeString(searchTerms))
    }
  }

  const terms = () => {
    let t
    if (q.length > 0) {
      // Currently we're joining the search terms with an OR operator
      // #TODO further optimize search results
      t = q[0].split(' ').join(' | ')
    } else {
      // If there are no search terms, return an empty string
      t = ''
    }
    return t
  }

  return { terms: terms(), tags, labels, categories }
}

const normalizeString = (str: string) => {
  // Strip out any quotes and trim whitespace from values
  return str.replace(/['"]+/g, '').trim().toLowerCase()
}
