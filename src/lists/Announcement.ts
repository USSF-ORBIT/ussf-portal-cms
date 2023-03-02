import { list } from '@keystone-6/core'
import { select, text, timestamp } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { DateTime } from 'luxon'
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
import { componentBlocks } from '../components/callToAction'

const Announcement = list(
  withTracking({
    access: {
      operation: {
        query: () => true,
        create: canCreateArticle,
        update: () => true,
        delete: () => true,
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
      status: select({
        type: 'enum',
        options: Object.entries(ANNOUNCEMENT_STATUSES).map(([, s]) => ({
          label: s,
          value: s,
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
        hooks: {
          resolveInput: async ({ inputData, item, resolvedData }) => {
            if (
              inputData.publishedDate &&
              (inputData.status !== ANNOUNCEMENT_STATUSES.PUBLISHED ||
                item?.status !== ANNOUNCEMENT_STATUSES.PUBLISHED)
            ) {
              // Set status if publishedDate is being changed and status is not changed or not already Published
              return ANNOUNCEMENT_STATUSES.PUBLISHED
            }
            return resolvedData.status
          },
        },
      }),
      publishedDate: timestamp({
        access: {
          create: () => false,
          update: canPublishArchiveArticle,
        },
        ui: {
          createView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: articleStatusView,
          },
        },
        hooks: {
          resolveInput: async ({ inputData, item, resolvedData }) => {
            if (
              inputData.status === ANNOUNCEMENT_STATUSES.PUBLISHED &&
              item?.status !== ANNOUNCEMENT_STATUSES.PUBLISHED &&
              !inputData.publishedDate
            ) {
              // Set publishedDate if status is being changed to "Published"
              // only set publishedDate if they didn't set one
              return DateTime.now().toJSDate()
            }
            return resolvedData.publishedDate
          },
          validateInput: async ({
            operation,
            inputData,
            resolvedData,
            addValidationError,
          }) => {
            if (operation === 'update' && inputData.publishedDate) {
              const publishedDate = DateTime.fromJSDate(
                resolvedData.publishedDate
              )
              // if the selected publish date is in the past it is invalid
              // but if it's recent then allow it since they could have been
              // editing the page for this amount of time after setting
              // date and saving
              if (publishedDate < DateTime.now().minus({ hours: 4 })) {
                addValidationError('Published date cannot be in the past')
              }
            }
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
        hooks: {
          resolveInput: async ({ inputData, item, resolvedData }) => {
            if (
              inputData.status === ANNOUNCEMENT_STATUSES.ARCHIVED &&
              item?.status !== ANNOUNCEMENT_STATUSES.ARCHIVED
            ) {
              // Set archivedDate if status is being changed to "Archived"
              return DateTime.now().toJSDate()
            }
            return resolvedData.archivedDate
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
          views: './src/components/callToAction',
        },
        componentBlocks,
      }),
    },
  })
)

export default Announcement
