import { list } from '@keystone-6/core'
import { text, checkbox } from '@keystone-6/core/fields'

import { isAdminOrSelf } from '../util/access'

import type { Lists } from '.keystone/types'

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
      query: () => true, // isAdminOrSelf,
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
      initialColumns: ['userId', 'name', 'isAdmin', 'isEnabled'],
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
        create: () => false,
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

    // TODO - also disable on login if SLAM access has been revoked
    isEnabled: checkbox({
      isFilterable: true,
      access: {
        update: ({ session, item }) => {
          if (session.isAdmin) {
            // Admin cannot change whether they're enabled
            if (session.userId === item.userId) return false

            // Admin can change whether other users are enabled
            return true
          }

          return false
        },
      },
      ui: {
        itemView: {
          fieldMode: ({ session, item }) => {
            if (session.isAdmin) {
              // Admin cannot change whether they're enabled
              if (session.userId === item.userId) return 'read'

              // Admin can change whether other users are enabled
              return 'edit'
            }

            return 'hidden'
          },
        },
      },
    }),
  },
})

export default User
