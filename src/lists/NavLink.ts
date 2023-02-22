import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const NavLink = list(
  withTracking({
    // Admin can create and update bookmarks
    // Users can view all bookmarks
    access: {
      operation: {
        create: isAdmin,
        query: () => true,
        update: isAdmin,
        delete: () => false,
      },
    },

    ui: {
      isHidden: true,
      hideCreate: ({ session }) => !isAdmin({ session }),
      hideDelete: true,
      itemView: {
        defaultFieldMode: editReadAdminUI,
      },
    },

    fields: {
      url: text({
        validation: {
          isRequired: true,
        },
      }),
      label: text({
        isOrderable: true,
      }),
    },
  })
)

export default NavLink
