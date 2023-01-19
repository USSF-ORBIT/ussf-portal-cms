import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const DocumentSection = list(
  withTracking({
    access: {
      operation: {
        // to do: update permissions
        create: () => true,
        query: () => true,
        update: () => true,
        delete: () => true,
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
      description: text(),
    },
  })
)

export default DocumentSection
