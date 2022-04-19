import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import { isAdmin, editReadAdminUI } from '../util/access'

const Bookmark: Lists.Bookmark = list({
  // Admin can create and update bookmarks
  // Users can view all bookmarks
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
    collections: relationship({ ref: 'Collection.bookmarks', many: true }),

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

export default Bookmark
