import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const DocumentSection = list(
  withTracking({
    access: {
      operation: {
        // to do: update permissions
        create: () => true, // author, manager, admin
        query: () => true, //  all
        update: () => true, // manager, author, admin
        delete: () => true, // manager, admin
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

      document: relationship({
        ref: 'Document',
        many: true,
      }),
    },
  })
)

export default DocumentSection
