export const ARTICLE_STATUSES = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
}

export type ArticleStatus =
  typeof ARTICLE_STATUSES[keyof typeof ARTICLE_STATUSES]
