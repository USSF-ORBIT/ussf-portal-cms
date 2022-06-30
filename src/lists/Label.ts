import { list } from '@keystone-6/core'
import { select, text } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import { isAdmin, editReadAdminUI } from '../util/access'
import { withTracking } from '../util/tracking'

const LABEL_TYPES = {
  SOURCE: 'Source',
  AUDIENCE: 'Audience',
  BASE: 'Base',
}

const Label: Lists.Label = list(
  withTracking({
    access: {
      operation: {
        create: isAdmin,
        query: () => true,
        update: isAdmin,
        delete: isAdmin,
      },
    },

    ui: {
      hideCreate: ({ session }) => !isAdmin({ session }),
      hideDelete: ({ session }) => !isAdmin({ session }),
      itemView: {
        defaultFieldMode: editReadAdminUI,
      },
    },

    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
        isIndexed: 'unique',
      }),
      type: select({
        type: 'enum',
        options: (
          Object.keys(LABEL_TYPES) as Array<keyof typeof LABEL_TYPES>
        ).map((r) => ({
          label: LABEL_TYPES[r],
          value: LABEL_TYPES[r],
        })),
        validation: {
          isRequired: true,
        },
      }),
    },
  })
)

export default Label
