import { setupTestEnv, setupTestRunner } from '@keystone-6/core/testing'
import { config } from '@keystone-6/core'
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

export const configTestEnv = async () => setupTestEnv({ config: testConfig })
export const configTestRunner = async () =>
  setupTestRunner({ config: testConfig })

export const testUsers = [
  {
    name: 'Admin User',
    userId: 'admin@example.com',
    isAdmin: true,
    isEnabled: true,
  },
  {
    name: 'User 1',
    userId: 'user1@example.com',
    isAdmin: false,
    isEnabled: true,
  },
]

export const adminSession = {
  listKey: 'User',
  name: 'Admin User',
  userId: 'admin@example.com',
  isAdmin: true,
  isEnabled: true,
}
