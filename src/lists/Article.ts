import { list } from '@keystone-6/core'
import { select, text } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import type { Lists } from '.keystone/types'
import { withTracking } from '../util/tracking'
import { ARTICLE_STATUSES } from '../util/workflows'
import { canCreateArticle, canUpdateDeleteArticle } from '../util/access'

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
      listView: {
        initialColumns: ['title', 'status'],
      },
    },

    fields: {
      slug: text({
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
        ui: {
          displayMode: 'textarea',
        },
      }),
      body: document({
        formatting: true,
        dividers: true,
        links: true,
      }),
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
        // TODO access
      }),
      keywords: text({
        ui: {
          displayMode: 'textarea',
        },
        isFilterable: true,
      }),
    },
  })
)

export default Article
