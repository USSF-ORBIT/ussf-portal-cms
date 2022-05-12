import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const Tag = list(
  withTracking({
    access: {
      operation: {
        create: isAdmin,
        query: () => true,
        update: isAdmin,
        delete: isAdmin,
      },
    },

    ui: {
      hideCreate: ({ session }) => !isAdmin({ session }),
      hideDelete: false,
      itemView: {
        defaultFieldMode: editReadAdminUI,
      },
    },

    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
      }),
    },
  })
)

export default Tag