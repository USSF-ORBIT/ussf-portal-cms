import { list } from '@keystone-6/core'
import { relationship, select, text } from '@keystone-6/core/fields'

import type { Lists } from '.keystone/types'

import { ANNOUNCEMENT_STATUSES } from '../util/workflows'
import {
  isAdmin,
  editReadAdminUI,
  announcementStatusView,
} from '../util/access'
import { withTracking } from '../util/tracking'

const Announcement: Lists.Announcement = list(
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
      title: text({
        validation: {
          isRequired: true,
        },
        isIndexed: 'unique',
      }),
      description: text({
        validation: {
          isRequired: true,
        },
      }),
      status: select({
        type: 'enum',
        options: (
          Object.keys(ANNOUNCEMENT_STATUSES) as Array<
            keyof typeof ANNOUNCEMENT_STATUSES
          >
        ).map((s) => ({
          label: ANNOUNCEMENT_STATUSES[s],
          value: ANNOUNCEMENT_STATUSES[s],
        })),
        defaultValue: ANNOUNCEMENT_STATUSES.DRAFT,
        validation: {
          isRequired: true,
        },
        access: {
          create: () => false,
          update: isAdmin,
        },
        ui: {
          displayMode: 'segmented-control',
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: announcementStatusView,
          },
        },
      }),
      article: relationship({
        ref: 'Article',
      }),
    },
  })
)

export default Announcement
