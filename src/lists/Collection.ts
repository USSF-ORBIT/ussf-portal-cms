import { list } from '@keystone-6/core'
import { checkbox, relationship, text } from '@keystone-6/core/fields'

import {
  canCreateCollection,
  canUpdateCollection,
  collectionCreateView,
} from '../util/access'
import { withTracking } from '../util/tracking'

const Collection = list(
  withTracking({
    access: {
      operation: {
        create: canCreateCollection,
        query: () => true,
        update: canUpdateCollection,
        delete: () => false,
      },
    },

    ui: {
      hideCreate: ({ session }) => !canCreateCollection({ session }),
      hideDelete: true,
      itemView: {
        defaultFieldMode: collectionCreateView,
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
