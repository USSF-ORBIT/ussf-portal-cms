import { list } from '@keystone-6/core'
import { select, text, timestamp } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import type { Lists } from '.keystone/types'

import { ANNOUNCEMENT_STATUSES } from '../util/workflows'
import {
  canCreateArticle,
  canUpdateDeleteArticle,
  canPublishArchiveArticle,
  articleCreateView,
  articleItemView,
  articleStatusView,
} from '../util/access'
import { withTracking } from '../util/tracking'
import { componentBlocks } from '../components/component-blocks'

const Announcement: Lists.Announcement = list(
  withTracking({
    access: {
      operation: {
        create: canCreateArticle,
        query: () => true,
      },
      filter: {
        update: canUpdateDeleteArticle,
        delete: canUpdateDeleteArticle,
      },
    },

    ui: {
      hideCreate: ({ session }) => !canCreateArticle({ session }),
      hideDelete: ({ session }) => !canCreateArticle({ session }),
      createView: {
        defaultFieldMode: articleCreateView,
      },
      itemView: {
        defaultFieldMode: articleItemView,
      },
    },

    fields: {
      title: text({
        validation: {
          isRequired: true,
          length: {
            max: 100,
          },
        },
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
        ui: {
          views: require.resolve('../components/component-blocks'),
        },
        componentBlocks,
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
            fieldMode: articleStatusView,
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
