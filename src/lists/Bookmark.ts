import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import {
  canCreateBookmark,
  canUpdateBookmark,
  bookmarkCreateView,
  canDeleteBookmark,
} from '../util/access'
import { withTracking } from '../util/tracking'

const Bookmark = list(
  withTracking({
    access: {
      operation: {
        create: canCreateBookmark,
        query: () => true,
        update: canUpdateBookmark,
        delete: canDeleteBookmark,
      },
    },

    ui: {
      hideCreate: ({ session }) => !canCreateBookmark({ session }),
      hideDelete: ({ session }) => !canDeleteBookmark({ session }),
      itemView: {
        defaultFieldMode: bookmarkCreateView,
      },
    },

    fields: {
      url: text({
        validation: {
          isRequired: true,
        },
      }),
      label: text({
        isOrderable: true,
      }),
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      keywords: text({
        ui: {
          displayMode: 'textarea',
        },
        isFilterable: true,
      }),
      collections: relationship({
        ref: 'Collection.bookmarks',
        many: true,
      }),
    },
  })
)

export default Bookmark
