import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const Bookmark = list(
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
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      keywords: text({
        ui: {
          displayMode: 'textarea',
        },
        isFilterable: true,
      }),
      collections: relationship({
        ref: 'Collection.bookmarks',
        many: true,
      }),
    },
  })
)

export default Bookmark
