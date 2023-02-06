import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import {
  canCreateDocumentPage,
  canDeleteDocument,
  documentPageCreateView,
  documentPageItemView,
} from '../util/access'
import { withTracking } from '../util/tracking'

const DocumentSection = list(
  withTracking({
    access: {
      operation: {
        create: (session) => canCreateDocumentPage(session),
        query: () => true,
        update: (session) => canCreateDocumentPage(session),
        delete: (session) => canDeleteDocument(session),
      },
    },

    ui: {
      hideCreate: (session) => !canCreateDocumentPage(session),
      hideDelete: (session) => !canDeleteDocument(session),
      createView: {
        defaultFieldMode: documentPageCreateView,
      },
      itemView: {
        defaultFieldMode: documentPageItemView,
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
