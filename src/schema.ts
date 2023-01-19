// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from '.keystone/types'

import User from './lists/User'
import Bookmark from './lists/Bookmark'
import Collection from './lists/Collection'
import Event from './lists/Event'
import Byline from './lists/Byline'
import Location from './lists/Location'
import Label from './lists/Label'
import Tag from './lists/Tag'
import Article from './lists/Article'
import Announcement from './lists/Announcement'
import Document from './lists/Document'
import DocumentSection from './lists/DocumentSection'
import DocumentsPage from './lists/DocumentsPage'
export const lists: Lists = {
  Event,
  User,
  Bookmark,
  Collection,
  Byline,
  Location,
  Label,
  Tag,
  Article,
  Announcement,
  Document,
  DocumentsPage,
  DocumentSection,
}
