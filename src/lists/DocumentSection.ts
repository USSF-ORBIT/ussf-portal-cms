import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'
import { documentOperationAccess } from '../util/access'

const DocumentSection = list(
  withTracking({
    access: {
      operation: {
        create: (session) => documentOperationAccess(session),
        query: (session) => documentOperationAccess(session),
        update: (session) => documentOperationAccess(session),
        delete: (session) => documentOperationAccess(session),
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
