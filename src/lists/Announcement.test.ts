import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv, TestEnvWithSessions } from '../testHelpers'

describe('Announcement schema', () => {
  let testEnv: TestEnvWithSessions

  let sudoContext: KeystoneContext
  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext

  let testAnnouncement: Record<string, any>
  let adminAnnouncement: Record<string, any>
  let authorAnnouncement: Record<string, any>
  let managerAnnouncement: Record<string, any>

  const announcementQuery = `id title status`

  const testAnnouncementData = {
    title: 'Test Announcement',
  }

  const resetAnnouncements = async () => {
    const allAnnouncements = await sudoContext.query.Announcement.findMany({
      query: 'id',
    })

    await sudoContext.query.Announcement.deleteMany({
      where: allAnnouncements.map((a) => ({ id: a.id })),
    })

    testAnnouncement = await sudoContext.query.Announcement.createOne({
      data: testAnnouncementData,
      query: announcementQuery,
    })
  }

  beforeAll(async () => {
    testEnv = await configTestEnv()
    sudoContext = testEnv.sudoContext
    adminContext = testEnv.adminContext
    userContext = testEnv.userContext
    authorContext = testEnv.authorContext
    managerContext = testEnv.managerContext
  })

  afterAll(async () => {
    await testEnv.disconnect()
  })

  describe('as a non-admin user with User role', () => {
    beforeAll(async () => {
      await resetAnnouncements()
    })

    it('cannot create an announcement', async () => {
      expect(
        userContext.query.Announcement.createOne({
          data: {
            title: 'User Announcement',
          },
          query: announcementQuery,
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'create' operation on the list 'Announcement'./
      )
    })

    it('cannot query announcements', async () => {
      const data = await userContext.query.Announcement.findMany({
        query: announcementQuery,
      })
      expect(data).toHaveLength(0)
    })

    it('cannot update an announcement', async () => {
      expect(
        userContext.query.Announcement.updateOne({
          where: { id: testAnnouncement.id },
          data: {
            title: 'User Updated Title',
          },
          query: announcementQuery,
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'update' operation on the list 'Announcement'./
      )
    })

    it('cannot delete an announcement', async () => {
      expect(
        userContext.query.Announcement.deleteOne({
          where: { id: testAnnouncement.id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Announcement'./
      )
    })
  })

  describe('as an admin user', () => {
    it('can create an announcement', async () => {
      const testAdminAnnouncement = {
        title: 'Admin Announcement',
      }

      adminAnnouncement = await adminContext.query.Announcement.createOne({
        data: testAdminAnnouncement,
        query: announcementQuery,
      })

      expect(adminAnnouncement).toMatchObject({
        ...testAdminAnnouncement,
        status: 'Draft',
      })
    })

    it('can query announcements', async () => {
      const data = await adminContext.query.Announcement.findMany({
        query: announcementQuery,
      })

      expect(data.length).toEqual(2)
      expect(data[0]).toMatchObject(testAnnouncement)
      expect(data[1]).toMatchObject(adminAnnouncement)
    })

    it('can update an announcement', async () => {
      const data = await adminContext.query.Announcement.updateOne({
        where: { id: adminAnnouncement.id },
        data: {
          title: 'Updated Announcement Title',
        },
        query: announcementQuery,
      })

      expect(data).toMatchObject({
        ...adminAnnouncement,
        title: 'Updated Announcement Title',
      })
    })

    it('cannot delete an announcement', async () => {
      expect(
        adminContext.query.Announcement.deleteOne({
          where: { id: adminAnnouncement.id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Announcement'./
      )
    })
  })

  describe('as a non-admin user with the Author role', () => {
    beforeAll(async () => {
      await resetAnnouncements()
    })

    it('can create an announcement', async () => {
      const testAuthorAnnouncement = {
        title: 'Author Announcement',
      }
      authorAnnouncement = await authorContext.query.Announcement.createOne({
        data: testAuthorAnnouncement,
        query: announcementQuery,
      })

      expect(authorAnnouncement).toMatchObject(testAuthorAnnouncement)
    })

    it('can query announcements', async () => {
      const data = await authorContext.query.Announcement.findMany({
        query: announcementQuery,
      })

      expect(data).toHaveLength(2)
    })

    it('can update an announcement', async () => {
      const data = await authorContext.query.Announcement.updateOne({
        where: { id: authorAnnouncement.id },
        data: {
          title: 'Update Author Announcement',
        },
        query: announcementQuery,
      })

      expect(data).toMatchObject({
        ...authorAnnouncement,
        title: 'Update Author Announcement',
      })
    })

    it('cannot delete an announcement', async () => {
      expect(
        authorContext.query.Announcement.deleteOne({
          where: { id: testAnnouncement.id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Announcement'./
      )
    })
  })

  describe('as a non-admin user with the Manager role', () => {
    beforeAll(async () => {
      await resetAnnouncements()
    })

    it('can create an announcement', async () => {
      const testManagerAnnouncement = {
        title: 'Manager Announcement',
      }
      managerAnnouncement = await managerContext.query.Announcement.createOne({
        data: testManagerAnnouncement,
        query: announcementQuery,
      })

      expect(managerAnnouncement).toMatchObject(testManagerAnnouncement)
    })

    it('can query announcements', async () => {
      const data = await managerContext.query.Announcement.findMany({
        query: announcementQuery,
      })

      expect(data).toHaveLength(2)
    })

    it('can update an announcement', async () => {
      const data = await managerContext.query.Announcement.updateOne({
        where: { id: managerAnnouncement.id },
        data: {
          title: 'Update Manager Announcement',
        },
        query: announcementQuery,
      })

      expect(data).toMatchObject({
        ...managerAnnouncement,
        title: 'Update Manager Announcement',
      })
    })

    it('cannot delete an announcement', async () => {
      expect(
        managerContext.query.Announcement.deleteOne({
          where: { id: testAnnouncement.id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot perform the 'delete' operation on the list 'Announcement'./
      )
    })
  })
})
