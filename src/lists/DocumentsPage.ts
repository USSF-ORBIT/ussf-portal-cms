import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import {
  canCreateOrUpdateDocument,
  canCreateDocumentPage,
  canDeleteDocument,
  documentPageCreateView,
  documentPageItemView,
} from '../util/access'
import { withTracking } from '../util/tracking'

const DocumentsPage = list(
  withTracking({
    access: {
      operation: {
        create: (session) => canCreateDocumentPage(session),
        query: () => true,
        update: (session) => canCreateOrUpdateDocument(session),
        delete: (session) => canDeleteDocument(session),
      },
    },
    ui: {
      hideCreate: (session) => !canCreateDocumentPage(session),
      hideDelete: (session) => !canDeleteDocument(session),
      label: 'Documents Page',
      createView: {
        defaultFieldMode: documentPageCreateView,
      },
      itemView: {
        defaultFieldMode: documentPageItemView,
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
