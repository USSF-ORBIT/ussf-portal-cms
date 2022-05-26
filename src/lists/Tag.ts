import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import {
  canCreateArticle,
  articleItemView,
  canUpdateDeleteArticle,
} from '../util/access'
import { withTracking } from '../util/tracking'

const Tag: Lists.Tag = list(
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
      hideCreate: ({ session }) => !canCreateArticle({ session }),
      hideDelete: ({ session }) => !canCreateArticle({ session }),
      createView: {
        defaultFieldMode: ({ session }) =>
          canCreateArticle({ session }) ? 'edit' : 'hidden',
      },
      itemView: {
        defaultFieldMode: articleItemView,
      },
    },

    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
        isIndexed: 'unique',
      }),
    },
  })
)

export default Tag
