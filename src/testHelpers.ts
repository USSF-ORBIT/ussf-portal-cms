import {
  TestEnv,
  setupTestEnv,
  setupTestRunner,
} from '@keystone-6/core/testing'
import { config } from '@keystone-6/core'
import { KeystoneContext } from '@keystone-6/core/types'

import { lists } from './schema'

const TEST_DATABASE = 'unit-test'
const TEST_DATABASE_CONNECTION = `postgres://keystone:keystonecms@0.0.0.0:5432/${TEST_DATABASE}`

export const testConfig = config({
  db: {
    provider: 'postgresql',
    url: TEST_DATABASE_CONNECTION,
    useMigrations: true,
  },
  lists,
})

export const testUsers = [
  {
    name: 'Admin User',
    userId: 'admin@example.com',
    isAdmin: true,
    isEnabled: true,
    role: 'User',
  },
  {
    name: 'User 1',
    userId: 'user1@example.com',
    isAdmin: false,
    isEnabled: true,
    role: 'User',
  },
]

export type TestEnvWithSessions = TestEnv & {
  sudoContext: KeystoneContext
  adminContext: KeystoneContext
  userContext: KeystoneContext
}

export const configTestEnv = async (): Promise<TestEnvWithSessions> => {
  // Set up Keystone test environment
  const testEnv = await setupTestEnv({ config: testConfig })
  const context = testEnv.testArgs.context

  await testEnv.connect()

  // Seed data
  await context.sudo().query.User.createMany({
    data: testUsers,
  })

  const adminUser = await context.sudo().query.User.findOne({
    where: {
      userId: 'admin@example.com',
    },
    query: 'id userId name isAdmin isEnabled',
  })

  const cmsUser = await context.sudo().query.User.findOne({
    where: {
      userId: 'user1@example.com',
    },
    query: 'id userId name isAdmin isEnabled',
  })

  const sudoContext = context.sudo()

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

  return { ...testEnv, sudoContext, adminContext, userContext }
}

export const configTestRunner = async () =>
  setupTestRunner({ config: testConfig })
