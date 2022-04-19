import { list } from '@keystone-6/core'
import { text, checkbox, timestamp } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import { isAdminOrSelf } from '../util/access'

const User: Lists.User = list({
  // No one can create or delete users
  // Admin can view & edit all users
  // Users can view & edit themselves
  access: {
    operation: {
      create: () => false,
      delete: () => false,
    },
    filter: {
      query: isAdminOrSelf,
      update: isAdminOrSelf,
    },
  },

  ui: {
    labelField: 'userId',
    searchFields: ['userId'],
    description: 'Keystone users',
    isHidden: false, // TODO - only show complete UI to admin
    hideCreate: true,
    hideDelete: true,
    listView: {
      initialColumns: ['userId', 'name', 'isAdmin', 'isEnabled', 'syncedAt'],
    },
  },

  fields: {
    // This is the userId populated by Redis
    // ultimately the NameID property from SAML auth on the portal client
    userId: text({
      db: {
        isNullable: false,
      },
      validation: {
        isRequired: true,
      },
      isIndexed: 'unique',
      isFilterable: true,
      access: {
        read: () => true,
        update: () => false,
      },
      ui: {
        itemView: {
          fieldMode: 'read',
        },
      },
    }),

    name: text({ validation: { isRequired: true }, label: 'Display name' }),

    isAdmin: checkbox({
      access: {
        // Admins can only be set using SLAM groups
        update: () => false,
      },
      ui: {
        itemView: {
          fieldMode: () => 'read',
        },
      },
    }),

    isEnabled: checkbox({
      isFilterable: true,
      access: {
        // Access can only be set using SLAM groups
        update: () => false,
      },
      ui: {
        itemView: {
          fieldMode: () => 'read',
        },
      },
    }),

    syncedAt: timestamp({
      label: 'Last synced with SLAM at',
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },
      access: {
        update: () => false,
      },
      ui: {
        itemView: {
          fieldMode: () => 'read',
        },
      },
    }),

    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },
      access: {
        update: () => false,
      },
      ui: {
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
        update: () => false,
      },
      ui: {
        itemView: {
          fieldMode: () => 'read',
        },
      },
    }),
  },
})

export default User
