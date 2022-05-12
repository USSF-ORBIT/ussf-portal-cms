import {
  ListConfig,
  BaseListTypeInfo,
  BaseFields,
  BaseItem,
} from '@keystone-6/core/types'
import { atTracking, byTracking /* logging */ } from '@k6-contrib/list-plugins'

export const withAtTracking = atTracking({})
export const withByTracking = byTracking({ ref: 'User' })

/**
 * Modified from: https://github.com/keystonejs-contrib/k6-contrib/blob/main/packages/list-plugins/src/lib/logging.ts
 * to create Events when logging
 */
// Uncomment this to pass in a logging function if we want to use one

export const logging =
  (
    loggingFn = process.env.NODE_ENV === 'test'
      ? () => {
          /* */
        }
      : (s: Record<string, unknown>) => console.log(JSON.stringify(s))
  ) =>
  <Field extends BaseFields<BaseListTypeInfo>>({
    hooks = {},
    ...rest
  }: ListConfig<BaseListTypeInfo, Field>): ListConfig<
    BaseListTypeInfo,
    Field
  > => ({
    hooks: {
      ...hooks,
      afterOperation: async (args) => {
        if (hooks.afterOperation) {
          await hooks.afterOperation(args)
        }

        const {
          operation,
          originalItem,
          inputData,
          item,
          context,
          listKey,
          resolvedData,
        } = args

        const {
          session: {
            itemId: authedItem = null,
            listKey: authedListKey = null,
          } = {},
        } = context

        const changedItem =
          operation === 'update'
            ? Object.entries(item as BaseItem)
                .filter(
                  ([key, value]) =>
                    key === 'id' || value !== originalItem?.[key]
                )
                .reduce((acc, [k, v]) => {
                  acc[k] = v
                  return acc
                }, {} as Record<string, unknown>)
            : undefined

        // Only create Events for actions performed by a user
        if (authedItem) {
          // Create a sudo context for adding an Event
          const sudoContext = context.sudo()

          await sudoContext.query.Event.createOne({
            data: {
              operation,
              itemListKey: listKey,
              itemId: item?.id,
              inputData,
              resolvedData,
              changedData: changedItem,
              originalItem,
              item,
              actor: {
                connect: {
                  id: authedItem,
                },
              },
            },
          })
        }

        if (operation === 'create') {
          loggingFn({
            operation,
            authedItem,
            authedListKey,
            inputData,
            listKey,
            createdItem: item,
          })
        } else if (operation === 'update') {
          loggingFn({
            operation,
            authedItem,
            authedListKey,
            inputData,
            listKey,
            changedItem,
          })
        } else if (operation === 'delete') {
          loggingFn({
            operation,
            authedItem,
            authedListKey,
            listKey,
            deletedItem: originalItem,
          })
        }
      },
    },
    ...rest,
  })

export const withLogging = logging()

export const withTracking: <Fields extends BaseFields<BaseListTypeInfo>>(
  listConfig: ListConfig<BaseListTypeInfo, Fields>
) => ListConfig<BaseListTypeInfo, Fields> = (list) =>
  withLogging(withAtTracking(withByTracking(list)))
