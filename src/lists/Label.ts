import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import { isAdmin, editReadAdminUI, canCreateArticle } from '../util/access'
import { withTracking } from '../util/tracking'

const Label: Lists.Label = list(
  withTracking({
    access: {
      operation: {
        create: isAdmin,
        query: canCreateArticle,
        update: isAdmin,
        delete: isAdmin,
      },
    },

    ui: {
      hideCreate: ({ session }) => !isAdmin({ session }),
      hideDelete: ({ session }) => !isAdmin({ session }),
      itemView: {
        defaultFieldMode: editReadAdminUI,
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

export default Label
