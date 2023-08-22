import { list } from '@keystone-6/core'
import { float, text } from '@keystone-6/core/fields'
import { allowAll, denyAll } from '@keystone-6/core/access'

const Zipcode = list({
  access: {
    operation: {
      query: allowAll,
      create: denyAll,
      update: denyAll,
      delete: denyAll,
    },
  },

  ui: {
    isHidden: () => true,
  },

  fields: {
    code: text({
      isIndexed: 'unique',
      validation: {
        isRequired: true,
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
