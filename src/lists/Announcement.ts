import { list } from '@keystone-6/core'
import { select, text, timestamp } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import type { Lists } from '.keystone/types'

import { ANNOUNCEMENT_STATUSES } from '../util/workflows'
import {
  announcementStatusView,
  canCreateArticle,
  canPublishArchiveArticle,
} from '../util/access'
import { withTracking } from '../util/tracking'

const Announcement: Lists.Announcement = list(
  withTracking({
    access: {
      operation: {
        create: canCreateArticle,
        query: canCreateArticle,
        update: canCreateArticle,
        delete: () => false,
      },
    },

    ui: {
      hideCreate: ({ session }) => !canCreateArticle({ session }),
      hideDelete: () => true,
      itemView: {
        defaultFieldMode: ({ session }) => {
          if (canCreateArticle({ session })) {
            return 'edit'
          }
          return 'hidden'
        },
      },
    },

    fields: {
      title: text({
        validation: {
          isRequired: true,
        },
        isIndexed: 'unique',
      }),
      body: document({
        formatting: {
          inlineMarks: {
            bold: true,
            italic: true,
            underline: true,
            strikethrough: true,
          },
        },
        links: true,
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
          update: canPublishArchiveArticle,
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
      publishedDate: timestamp({
        access: {
          create: () => false,
          update: () => false,
        },
        ui: {
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: () => 'read',
          },
        },
      }),
      archivedDate: timestamp({
        access: {
          create: () => false,
          update: () => false,
        },
        ui: {
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: () => 'read',
          },
        },
      }),
    },

    hooks: {
      resolveInput: async ({ inputData, item, resolvedData }) => {
        // Workflow side effects
        if (
          inputData.status === ANNOUNCEMENT_STATUSES.ARCHIVED &&
          item?.status !== ANNOUNCEMENT_STATUSES.ARCHIVED
        ) {
          // Set archivedDate if status is being changed to "Archived"
          resolvedData.archivedDate = new Date()
        } else if (
          inputData.status === ANNOUNCEMENT_STATUSES.PUBLISHED &&
          item?.status !== ANNOUNCEMENT_STATUSES.PUBLISHED
        ) {
          // Set publishedDate if status is being changed to "Published"
          resolvedData.publishedDate = new Date()
        }

        return resolvedData
      },
    },
  })
)

export default Announcement
