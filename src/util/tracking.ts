import {
  ListConfig,
  BaseListTypeInfo,
  BaseFields,
} from '@keystone-6/core/types'
import { atTracking, byTracking, logging } from '@k6-contrib/list-plugins'

export const withAtTracking = atTracking({})
export const withByTracking = byTracking({ ref: 'User' })

export const withLogging = logging((args) => console.log(args))

export const withAllTracking: <Fields extends BaseFields<BaseListTypeInfo>>(
  listConfig: ListConfig<BaseListTypeInfo, Fields>
) => ListConfig<BaseListTypeInfo, Fields> = (list) =>
  withLogging(withAtTracking(withByTracking(list)))
