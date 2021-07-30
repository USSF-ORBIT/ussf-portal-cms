import { Directus, MemoryStorage } from '@directus/sdk'

const prefix = 'jssdk'
const storage = new MemoryStorage(prefix)

const directus = new Directus('http://localhost:8055', { storage })

const bookmarks = 'bookmarks'

const downBookmarks = async () => {
  await directus.collections.deleteOne(bookmarks)
}

const upBookmarks = async () => {
  // Seed bookmarks
  const bookmarkResult = await directus.collections.createOne({
    collection: 'bookmarks',
    note: 'Bookmarked Links',
    fields: [
      {
        field: 'Name',
        type: 'string',
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

  const bookmarks = await directus.collections.readOne('bookmarks')
  console.log('Bookmarks (DB)', bookmarks)
}

initDirectus()
