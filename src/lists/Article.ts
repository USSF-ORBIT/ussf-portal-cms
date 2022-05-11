import { list } from '@keystone-6/core'
import { select, text } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import type { Lists } from '.keystone/types'
import { withTracking } from '../util/tracking'
import { ARTICLE_STATUSES } from '../util/workflows'
import {
  canCreateArticle,
  canUpdateDeleteArticle,
  canPublishArchiveArticle,
  articleItemView,
  articleStatusView,
} from '../util/access'

const Article: Lists.Article = list(
  withTracking({
    access: {
      operation: {
        create: canCreateArticle,
        query: () => true,
      },
      filter: {
        update: canUpdateDeleteArticle,
        delete: canUpdateDeleteArticle,
      },
    },

    ui: {
      labelField: 'title',
      hideCreate: ({ session }) => !canCreateArticle({ session }),
      hideDelete: ({ session }) => !canCreateArticle({ session }),
      createView: {
        defaultFieldMode: ({ session }) =>
          canCreateArticle({ session }) ? 'edit' : 'hidden',
      },
      itemView: {
        defaultFieldMode: articleItemView,
      },
      listView: {
        initialColumns: ['title', 'status'],
      },
    },

    fields: {
      status: select({
        type: 'enum',
        options: (
          Object.keys(ARTICLE_STATUSES) as Array<keyof typeof ARTICLE_STATUSES>
        ).map((s) => ({
          label: ARTICLE_STATUSES[s],
          value: ARTICLE_STATUSES[s],
        })),
        defaultValue: ARTICLE_STATUSES.DRAFT,
        validation: {
          isRequired: true,
        },
        access: {
          create: () => false,
          update: canPublishArchiveArticle,
        },
        ui: {
          displayMode: 'segmented-control',
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: articleStatusView,
          },
        },
      }),
      slug: text({
        // TODO - hook & regex validation
        isIndexed: 'unique',
        validation: {
          isRequired: true,
        },
      }),
      title: text({
        validation: {
          isRequired: true,
        },
      }),
      preview: text({
        // TODO - hook
        ui: {
          displayMode: 'textarea',
        },
      }),
      body: document({
        formatting: true,
        dividers: true,
        links: true,
      }),
      keywords: text({
        ui: {
          displayMode: 'textarea',
        },
        isFilterable: true,
      }),
      // TODO - publishedDate & archivedDate
    },
  })
)

export default Article
