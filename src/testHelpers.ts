import {
  TestEnv,
  setupTestEnv,
  setupTestRunner,
} from '@keystone-6/core/testing'
import { config } from '@keystone-6/core'
import { KeystoneContext } from '@keystone-6/core/types'

import type { User } from '.prisma/client'
import { lists } from './schema'
import { extendGraphqlSchema } from './lib/schema'

const TEST_DATABASE = 'unit-test'
const TEST_DATABASE_CONNECTION = `postgres://keystone:keystonecms@0.0.0.0:5432/${TEST_DATABASE}?connect_timeout=10`

export const testConfig = config({
  db: {
    provider: 'postgresql',
    url: TEST_DATABASE_CONNECTION,
    useMigrations: true,
    prismaPreviewFeatures: ['fullTextSearch'],
  },
  lists,
  storage: {
    local_images: {
      kind: 'local',
      type: 'image',
      generateUrl: (path: string) => `localhost:3001/images${path}`,
      serverRoute: {
        path: '/images',
      },
      storagePath: 'public/images',
    },
    // Because cms_images is a possibility, it needs to be passed
    // to test config. Replicating local config since we don't wan't
    // to test against s3
    cms_images: {
      kind: 'local',
      type: 'image',
      generateUrl: (path: string) => `localhost:3001/images${path}`,
      serverRoute: {
        path: '/images',
      },
      storagePath: 'public/images',
    },
  },
  extendGraphqlSchema,
})

const adminUserData = {
  name: 'Admin User',
  userId: 'admin@example.com',
  isAdmin: true,
  isEnabled: true,
  role: 'User',
}
const userUserData = {
  name: 'User 1',
  userId: 'user1@example.com',
  isAdmin: false,
  isEnabled: true,
  role: 'User',
}
const authorUserData = {
  name: 'Ethel Neal',
  userId: 'NEAL.ETHEL.643097412',
  isAdmin: false,
  isEnabled: true,
  role: 'Author',
}
const managerUserData = {
  name: 'Christina Haven',
  userId: 'HAVEN.CHRISTINA.561698119',
  isAdmin: false,
  isEnabled: true,
  role: 'Manager',
}

export const testUsers = [
  adminUserData,
  userUserData,
  authorUserData,
  managerUserData,
]

export type TestEnvWithSessions = TestEnv & {
  sudoContext: KeystoneContext
  adminContext: KeystoneContext
  userContext: KeystoneContext
  authorContext: KeystoneContext
  managerContext: KeystoneContext
}

export const configTestEnv = async (): Promise<TestEnvWithSessions> => {
  // Set up Keystone test environment
  const testEnv = await setupTestEnv({ config: testConfig })
  const context = testEnv.testArgs.context

  await testEnv.connect()

  const sudoContext = context.sudo()

  const userQuery = 'id userId name role isAdmin isEnabled'

  // Seed data
  const users = await sudoContext.query.User.createMany({
    data: testUsers,
    query: userQuery,
  })

  const adminUser = users.find((u) => u.userId === adminUserData.userId) as User
  const cmsUser = users.find((u) => u.userId === userUserData.userId) as User
  const authorUser = users.find(
    (u) => u.userId === authorUserData.userId
  ) as User
  const managerUser = users.find(
    (u) => u.userId === managerUserData.userId
  ) as User

  const adminContext = context.withSession({
    ...adminUser,
    accessAllowed: true,
    itemId: adminUser.id,
    listKey: 'User',
  })

  const userContext = context.withSession({
    ...cmsUser,
    accessAllowed: true,
    itemId: cmsUser.id,
    listKey: 'User',
  })

  const authorContext = context.withSession({
    ...authorUser,
    accessAllowed: true,
    itemId: authorUser.id,
    listKey: 'User',
  })

  const managerContext = context.withSession({
    ...managerUser,
    accessAllowed: true,
    itemId: managerUser.id,
    listKey: 'User',
  })

  return {
    ...testEnv,
    sudoContext,
    adminContext,
    userContext,
    authorContext,
    managerContext,
  }
}

export const configTestRunner = async () =>
  setupTestRunner({ config: testConfig })
