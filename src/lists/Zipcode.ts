import { list } from '@keystone-6/core'
import { float, integer, text } from '@keystone-6/core/fields'
import { denyAll } from '@keystone-6/core/access'

const Zipcode = list({
  access: {
    operation: denyAll,
  },

  ui: {
    hideCreate: () => true,
    hideDelete: () => true,
  },

  fields: {
    code: integer({
      validation: {
        isRequired: true,
        max: 10,
      },
    }),
    latitude: float({
      validation: {
        isRequired: true,
      },
    }),
    longitude: float({
      validation: {
        isRequired: true,
      },
    }),
  },
})

export default Zipcode
