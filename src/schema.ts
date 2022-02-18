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
  // Here we define the user list.
  User: list({
    access: {
      operation: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
      filter: {
        query: filterUser,
      },
    },

    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      // The password field takes care of hiding details and hashing values
      password: password({
        validation: { isRequired: true },
        ui: {
          itemView: {
            fieldMode: showHideAdminUI,
          },
        },
      }),
      isAdmin: checkbox({
        ui: {
          itemView: {
            fieldMode: showHideAdminUI,
          },
        },
      }),
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      listView: {
        initialColumns: ['name'],
      },
      itemView: {
        defaultFieldMode: editReadAdminUI,
      },
      hideCreate: !isAdmin,
      hideDelete: !isAdmin,
    },
  }),
}
