// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from '.keystone/types'

import User from './lists/User'
import Bookmark from './lists/Bookmark'
import Collection from './lists/Collection'
import Event from './lists/Event'

export const lists: Lists = {
  Event,
  User,
  Bookmark,
  Collection,
}
