import { KeystoneContext } from '@keystone-6/core/types'

import { configTestEnv } from '../testHelpers'

describe('Announcement schema', () => {
  let adminContext: KeystoneContext
  let userContext: KeystoneContext
  let authorContext: KeystoneContext
  let managerContext: KeystoneContext
  let sudoContext: KeystoneContext

  let testAnnouncement: Record<string, any>
  let adminAnnouncement: Record<string, any>
  let authorAnnouncement: Record<string, any>
  let managerAnnouncement: Record<string, any>

  const announcementQuery = `id title status`

  const testAnnouncementData = {
    title: 'Test Announcement',
  }
  // Set up test environment, seed data, and return contexts
  beforeAll(
    async () =>
      ({
        adminContext,
        userContext,
        authorContext,
        managerContext,
        sudoContext,
      } = await configTestEnv())
  )

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
      ).rejects.toThrow(/Access denied: You cannot create that Announcement/)
    })

    it('can query announcements', async () => {
      const data = await userContext.query.Announcement.findMany({
        query: announcementQuery,
      })

      expect(data).toHaveLength(1)
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
        /Access denied: You cannot update that Announcement - it may not exist/
      )
    })

    it('cannot delete an announcement', async () => {
      expect(
        userContext.query.Announcement.deleteOne({
          where: { id: testAnnouncement.id },
        })
      ).rejects.toThrow(
        /Access denied: You cannot delete that Announcement - it may not exist/
      )
    })
  })

  describe('as an admin user', () => {
    beforeAll(async () => {
      await resetAnnouncements()
    })

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

    it('can delete an announcement', async () => {
      await adminContext.query.Announcement.deleteOne({
        where: { id: adminAnnouncement.id },
      })

      const data = await adminContext.query.Announcement.findOne({
        where: { id: adminAnnouncement.id },
        query: announcementQuery,
      })

      expect(data).toEqual(null)
    })
  })

  describe('as a non-admin user with the Author role', () => {
    beforeAll(async () => {
      await resetAnnouncements()
    })

    it('can create an announcement', async () => {
      const testAuthorAnnouncement = {
        title: 'Author Announcement',
        status: 'Draft',
      }
      authorAnnouncement = await authorContext.query.Announcement.createOne({
        data: {
          title: 'Author Announcement',
        },
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

    it('can delete an announcement it created', async () => {
      await authorContext.query.Announcement.deleteOne({
        where: { id: authorAnnouncement.id },
      })

      const data = await authorContext.query.Announcement.findOne({
        where: { id: authorAnnouncement.id },
        query: announcementQuery,
      })

      expect(data).toEqual(null)
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

    it('can delete an announcement', async () => {
      await managerContext.query.Announcement.deleteOne({
        where: { id: managerAnnouncement.id },
      })

      const data = await managerContext.query.Announcement.findOne({
        where: { id: managerAnnouncement.id },
        query: announcementQuery,
      })

      expect(data).toEqual(null)
    })
  })
})
