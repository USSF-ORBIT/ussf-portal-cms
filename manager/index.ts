import { Directus, MemoryStorage } from '@directus/sdk'

const prefix = 'jssdk'
const storage = new MemoryStorage(prefix)

const directus = new Directus('http://localhost:8055', { storage })

const BOOKMARKS = 'testbookmark'

const downBookmarks = async () => {
  await directus.collections.deleteOne(BOOKMARKS)
}

const upBookmarks = async () => {
  // Seed bookmarks
  const bookmarkResult = await directus.collections.createOne({
    collection: BOOKMARKS,
    meta: {
      note: 'Bookmarked Links from JS SDK',
      hidden: false,
      singleton: false,
      archive_field: 'status',
      archive_app_filter: true,
      archive_value: 'archived',
      unarchive_value: 'draft',
      sort_fiel: 'sort',
      accountability: 'all',
    },
    fields: [
      {
        field: 'title',
        type: 'string',
        meta: {
          interface: 'input',
          display: 'raw',
          readonly: false,
          hidden: false,
          width: 'full',
        },
      },
      {
        field: 'URL',
        type: 'string',
        schema: {
          is_nullable: false,
        },
      },
    ],
  })

  console.log('Created Bookmarks', bookmarkResult)
}

const initDirectus = async () => {
  console.log('Hello world!')

  await directus.auth.login({
    email: 'admin@example.com',
    password: 'd1r3ctu5',
  })

  console.log('authenticated!')

  // Get bookmarks
  const bookmarks = await directus.collections.readOne('bookmarks')
  console.log(bookmarks)

  const bookmarkFields = await directus.fields.readOne(8)
  console.log(bookmarkFields)

  // this is not working right now, permissions errors with deleting collections??
  // await downBookmarks()
  // await upBookmarks()

  /*
  const roles = await directus.roles.readMany()
  const adminRole = roles.data?.find((r) => r.name === 'Admin')
  if (adminRole) {
    // Need to add a "down" for these
    const permissionResult = await directus.permissions.createMany([
      {
        role: adminRole.id,
        collection: 'bookmarks',
        action: 'create',
        fields: ['name', 'url'],
      },
      {
        role: adminRole.id,
        collection: 'bookmarks',
        action: 'read',
        fields: ['name', 'url'],
      },
      {
        role: adminRole.id,
        collection: 'bookmarks',
        action: 'update',
        fields: ['name', 'url'],
      },
      {
        role: adminRole.id,
        collection: 'bookmarks',
        action: 'delete',
        fields: ['name', 'url'],
      },
    ])

    console.log('added permission', permissionResult)
  }
  */
}

initDirectus()
