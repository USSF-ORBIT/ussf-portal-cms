import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import {
  isAdmin,
  editReadAdminUI,
  documentOperationAccess,
} from '../util/access'
import { withTracking } from '../util/tracking'

const DocumentsPage = list(
  withTracking({
    access: {
      operation: {
        create: (session) => documentOperationAccess(session),
        query: (session) => documentOperationAccess(session),
        update: (session) => documentOperationAccess(session),
        delete: (session) => documentOperationAccess(session),
      },
    },
    // #TODO: After upgrade, add isSingleton: true
    // This will skip displaying a list and take the user
    // directly to the documents page to update
    ui: {
      hideCreate: ({ session }) => !isAdmin({ session }),
      hideDelete: ({ session }) => !isAdmin({ session }),
      itemView: {
        defaultFieldMode: editReadAdminUI,
      },
      label: 'Documents Page',
    },

    fields: {
      pageTitle: text({
        validation: {
          isRequired: true,
        },
      }),

      sections: relationship({
        ref: 'DocumentSection',
        many: true,
      }),
    },
  })
)

export default DocumentsPage
