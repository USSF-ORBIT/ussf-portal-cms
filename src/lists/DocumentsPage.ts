import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const DocumentsPage = list(
  withTracking({
    access: {
      operation: {
        // to do: update permissions
        create: () => true, // admin
        query: () => true, //  all
        update: () => true, // manager, author, admin
        delete: () => true, // admin
      },
    },
    // #TODO: After upgrade, add isSingleton: true
    // This will skip displaying a list and take the user
    // directly to the documents page to update
    ui: {
      hideCreate: ({ session }) => !isAdmin({ session }),
      itemView: {
        defaultFieldMode: editReadAdminUI,
      },
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
