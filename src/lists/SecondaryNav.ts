import { list, graphql } from '@keystone-6/core'
import {
  virtual,
  checkbox,
  json,
  relationship,
  text,
} from '@keystone-6/core/fields'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const SecondaryNav = list(
  withTracking({
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
    isSingleton: true,
    fields: {
      links: relationship({
        ref: 'NavLink',
        many: true,
      }),
    },
    hooks: {
      afterOperation: (args) => {
        console.log('💚 What are the args AFTER Operation', args)
      },
    },
  })
)

export default SecondaryNav
