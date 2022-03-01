/*
Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/
// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from '@keystone-6/core'

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import { text, password, checkbox } from '@keystone-6/core/fields'

import { Session } from '../types'

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from '.keystone/types'

// Access Control
export const isAdmin = ({ session }: { session: Session }) =>
  session?.data.isAdmin

const filterUser = ({ session }: { session: Session }) => {
  // if the user is an Admin, they can access all the users
  if (session?.data.isAdmin) return true
  // otherwise, filter for single user
  return { email: { equals: session?.data.email } }
}

export const showHideAdminUI = ({ session }: { session: Session }) =>
  session?.data.isAdmin ? 'edit' : 'hidden'

export const editReadAdminUI = ({ session }: { session: Session }) =>
  session?.data.isAdmin ? 'edit' : 'read'

export const lists: Lists = {
  // Users
  User: list({
    fields: {
      nameId: text({
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

      // TODO - remove
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),

      // TODO - remove
      password: password({
        validation: { isRequired: true },
        ui: {
          itemView: {
            fieldMode: showHideAdminUI,
          },
        },
      }),

      // Access
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
      filter: {
        query: filterUser,
        update: filterUser,
      },
    },

    ui: {
      labelField: 'nameId',
      searchFields: ['nameId'],
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
        initialColumns: ['nameId'],
      },
    },
  }),
  /** end User */
}
