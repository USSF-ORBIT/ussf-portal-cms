import { list } from '@keystone-6/core'
import {
  checkbox,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields'
import { isAdmin, editReadAdminUI } from '../util/access'

import type { Lists } from '.keystone/types'

const Collection: Lists.Collection = list({
  access: {
    operation: {
      create: isAdmin,
      query: () => true,
      update: isAdmin,
      delete: () => false,
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
    bookmarks: relationship({ ref: 'Bookmark.collections', many: true }),
    showInSitesApps: checkbox({
      defaultValue: false,
      label: 'Show in Sites & Apps',
    }),

    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },
      access: {
        create: () => false,
        update: () => false,
      },
      ui: {
        createView: {
          fieldMode: () => 'hidden',
        },
        itemView: {
          fieldMode: () => 'read',
        },
      },
    }),

    updatedAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },
      db: {
        updatedAt: true,
      },
      access: {
        create: () => false,
        update: () => false,
      },
      ui: {
        createView: {
          fieldMode: () => 'hidden',
        },
        itemView: {
          fieldMode: () => 'read',
        },
      },
    }),
  },
})

export default Collection
