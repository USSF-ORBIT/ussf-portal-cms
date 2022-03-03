import { list } from '@keystone-6/core'
import { text, checkbox } from '@keystone-6/core/fields'

import { showHideAdminUI, editReadAdminUI } from '../util/access'

import type { Lists } from '.keystone/types'

const User: Lists.User = list({
  fields: {
    // This is the userId populated by Redis
    // ultimately the NameID property from SAML auth on the portal client
    userId: text({
      validation: {
        isRequired: true,
      },
      isIndexed: 'unique',
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
    }),

    name: text({ validation: { isRequired: true } }),

    isAdmin: checkbox({
      ui: {
        itemView: {
          fieldMode: showHideAdminUI,
        },
      },
    }),
    isEnabled: checkbox({
      ui: {
        itemView: {
          fieldMode: showHideAdminUI,
        },
      },
    }),
  },

  access: {
    operation: {
      query: () => true,
      create: () => false,
      delete: () => false,
    },
    /*
      filter: {
        query: filterUser,
        update: filterUser,
      },
      */
  },

  ui: {
    labelField: 'userId',
    searchFields: ['userId'],
    description: 'Keystone users',
    hideCreate: true,
    hideDelete: true,
    createView: {
      defaultFieldMode: 'hidden',
    },
    itemView: {
      defaultFieldMode: editReadAdminUI,
    },
    listView: {
      initialColumns: ['userId'],
    },
  },
})

export default User
