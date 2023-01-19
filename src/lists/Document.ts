import { list } from '@keystone-6/core'
import { checkbox, file, text } from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'
import { isLocalStorage } from '../util/getStorage'
const Document = list(
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
      document: file({
        storage: isLocalStorage() ? 'local_files' : 'cms_files',
      }),
      description: text({
        validation: {
          isRequired: false,
        },
      }),
    },
  })
)

export default Document
