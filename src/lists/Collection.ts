import { list } from '@keystone-6/core'
import { checkbox, relationship, text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const Collection = list(
  withTracking({
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
      title: text({
        validation: {
          isRequired: true,
        },
      }),
      bookmarks: relationship({ ref: 'Bookmark.collections', many: true }),
      showInSitesApps: checkbox({
        defaultValue: false,
        label: 'Show in Sites & Apps',
      }),
    },
  })
)

export default Collection
