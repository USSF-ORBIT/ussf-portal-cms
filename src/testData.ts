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
    `[{"type":"paragraph","children":[{"text":"Lorem ipsum"}]}]`
  ),
  labels: { create: { name: 'All Guardians', type: 'Audience' } },
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
]
