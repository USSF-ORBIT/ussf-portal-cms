import { DateTime } from 'luxon'

// Bookmarks
export const myVector = {
  label: 'MyVector',
  url: 'https://myvector.us.af.mil/myvector/Home/Dashboard',
  description: 'Manage your desired career path.',
}

export const surf = {
  label: 'SURF',
  url: 'https://afpcsecure.us.af.mil/',
  description: 'A one page summary of your career found on AMS',
  keywords: 'foo',
}

export const orders = {
  label: 'Orders',
  url: 'https://afpcsecure.us.af.mil/',
  description: 'View PCS orders through vMPF.',
  keywords: 'foo',
}

export const testBookmarks = [myVector, surf, orders]

// Articles
export const publishedArticleData = {
  title: 'Test Article',
  slug: 'test-article',
  category: 'InternalNews',
  status: 'Published',
  preview: 'A test article that is published.',
  keywords: 'foo',
  publishedDate: DateTime.now().toISO(),
  body: JSON.parse(
    `[{"type":"paragraph","children":[{"text":"Lorem ipsum dolor sit amet"}]}]`
  ),
  labels: { create: { name: 'All Guardians', type: 'Audience' } },
  tags: { create: { name: 'Test Tag' } },
}

export const publishedArticleWithMultipleTagsData = {
  title: 'Civilian Article',
  slug: 'civilian-article',
  category: 'InternalNews',
  status: 'Published',
  preview: 'A civilian test article that is published.',
  keywords: 'bar',
  publishedDate: DateTime.now().toISO(),
  body: JSON.parse(
    `[{"type":"paragraph","children":[{"text":"Lorem ipsum"}]}]`
  ),
  labels: { create: { name: 'Civilians', type: 'Audience' } },
  tags: { create: { name: 'Lorem Tag' } },
}

export const scheduledArticleData = {
  title: 'Test Scheduled Article',
  slug: 'test-scheduled-article',
  category: 'InternalNews',
  status: 'Published',
  preview: 'A test scheduled article that is published in the future.',
  keywords: 'foo',
  publishedDate: DateTime.now().plus({ weeks: 2 }).toISO(),
  body: JSON.parse(
    `[{"type":"paragraph","children":[{"text":"Published in the future articles don't show in results"}]}]`
  ),
}

export const draftArticleData = {
  title: 'Draft Article',
  slug: 'draft-article',
  category: 'InternalNews',
  status: 'Draft',
  preview: 'A test article that is a draft.',
  keywords: 'bar',
}

export const searchTermArticleData = {
  title: 'New MyVector Launch',
  slug: 'new-my-vector',
  category: 'InternalNews',
  status: 'Published',
  publishedDate: DateTime.now().toISO(),
  preview: 'This will match on the search term MyVector.',
}

export const testArticles = [
  publishedArticleData,
  scheduledArticleData,
  draftArticleData,
  searchTermArticleData,
  publishedArticleWithMultipleTagsData,
]

// Landing Pages
export const publishedLandingPageData = {
  pageTitle: 'Published Landing Page',
  slug: 'published-landing-page',
  pageDescription: 'A published landing page.',
  status: 'Published',
  publishedDate: DateTime.now().toISO(),
  articleTag: { create: { name: 'Test Landing Page Tag' } },
}

export const futurePublishedLandingPageData = {
  pageTitle: 'Future Published Landing Page',
  slug: 'future-published-landing-page',
  pageDescription: 'A soon to be published landing page.',
  status: 'Published',
  publishedDate: DateTime.now().plus({ week: 1 }).toISO(),
}

export const draftLandingPageData = {
  pageTitle: 'Draft Landing Page',
  slug: 'draft-landing-page',
  pageDescription: 'A draft landing page.',
  status: 'Draft',
}

export const archivedLandingPageData = {
  pageTitle: 'Archived Landing Page',
  slug: 'archived-landing-page',
  pageDescription: 'An archived landing page.',
  status: 'Archived',
  archivedDate: DateTime.now().toISO(),
}

export const testLandingPages = [
  publishedLandingPageData,
  futurePublishedLandingPageData,
  draftLandingPageData,
  archivedLandingPageData,
]
