import { list } from '@keystone-6/core'
import { json, relationship, text } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import { isAdmin } from '../util/access'
import { withAtTracking } from '../util/tracking'

const Event: Lists.Event = list(
  withAtTracking({
    access: {
      operation: {
        create: () => false,
        query: isAdmin,
        update: () => false,
        delete: () => false,
      },
    },

    ui: {
      description: 'A generated log of all CMS mutations',
      isHidden: !isAdmin,
      hideCreate: true,
      hideDelete: true,
      itemView: {
        defaultFieldMode: 'read',
      },
    },

    fields: {
      operation: text(), // create, update, or delete
      itemListKey: text(), // the list being operated on
      itemId: text(), // the ID of the item being operated on
      inputData: json(), // the user input data
      resolvedData: json(), // the resolved data
      changedData: json(), // for update only, a diff
      originalItem: json(), // the item before changes
      item: json(), // the item after changes
      actor: relationship({ ref: 'User' }), // the user who performed the operation
    },
  })
)

export default Event
