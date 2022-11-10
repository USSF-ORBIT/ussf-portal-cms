import { list, graphql } from '@keystone-6/core'
import { json, relationship, text, virtual } from '@keystone-6/core/fields'

import { isAdmin } from '../util/access'
import { withAtTracking } from '../util/tracking'

const Event = list(
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
      labelField: 'name',
      description: 'A generated log of all CMS mutations',
      isHidden: !isAdmin,
      hideCreate: true,
      hideDelete: true,
      listView: {
        initialColumns: ['name', 'itemId', 'actor'],
      },
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

      // Virtual fields (for display only)
      name: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve(item) {
            const { operation, itemListKey } = item
            return `${operation} ${itemListKey}`
          },
        }),
      }),
    },
  })
)

export default Event
