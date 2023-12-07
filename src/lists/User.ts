import { list } from '@keystone-6/core'
import { text, checkbox, timestamp, select } from '@keystone-6/core/fields'

import {
  USER_ROLES,
  isAdmin,
  isAdminOrSelf,
  editReadAdminUI,
  userQueryFilter,
  userItemView,
} from '../util/access'
import { withTracking } from '../util/tracking'

const User = list(
  withTracking({
    // No one can delete users
    // Admin can create, view & edit all users
    // Users can view & edit themselves
    access: {
      operation: {
        create: isAdmin,
        delete: () => false,
        update: () => true,
        query: () => true,
      },
      filter: {
        query: userQueryFilter,
        update: isAdminOrSelf,
      },
    },

    ui: {
      labelField: 'userId',
      searchFields: ['userId'],
      description: 'Keystone users',
      isHidden: false,
      hideCreate: (args) => !isAdmin(args.context),
      hideDelete: true,
      itemView: {
        defaultFieldMode: userItemView,
      },
      listView: {
        initialColumns: [
          'userId',
          'name',
          'role',
          'isAdmin',
          'isEnabled',
          'syncedAt',
        ],
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
          update: isAdmin,
        },
      }),

      name: text({
        validation: { isRequired: true },
        label: 'Display name',
      }),

      isAdmin: checkbox({
        access: {
          // Admins can only be set using SLAM groups
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

      isEnabled: checkbox({
        isFilterable: true,
        ui: {
          itemView: {
            fieldMode: editReadAdminUI,
          },
        },
        access: {
          update: isAdmin,
        },
      }),

      role: select({
        type: 'enum',
        options: Object.entries(USER_ROLES).map(([, v]) => ({
          label: v,
          value: v,
        })),
        defaultValue: USER_ROLES.USER,
        validation: {
          isRequired: true,
        },
        access: {
          read: () => true,
          update: isAdmin,
        },
        ui: {
          itemView: {
            fieldMode: editReadAdminUI,
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
)

export default User
