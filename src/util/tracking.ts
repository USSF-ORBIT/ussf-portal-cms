import { atTracking, byTracking } from '@k6-contrib/list-plugins'

export const withAtTracking = atTracking({})
export const withByTracking = byTracking({ ref: 'User' })
