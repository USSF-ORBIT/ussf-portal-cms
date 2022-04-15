import React, { useEffect, useState } from 'react'
import type { NavigationProps } from '@keystone-6/core/admin-ui/components'
import {
  NavigationContainer,
  NavItem,
  ListNavItems,
} from '@keystone-6/core/admin-ui/components'

export function CustomNavigation({
  authenticatedItem,
  lists,
}: NavigationProps) {
  const [portalUrl, setPortalUrl] = useState('')

  useEffect(() => {
    const fetchSysinfo = async () => {
      const { portalUrl } = await fetch('/api/sysinfo').then((r) => r.json())
      setPortalUrl(portalUrl)
    }

    if (!portalUrl) {
      fetchSysinfo()
    }
  }, [])

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href={portalUrl}>USSF Portal</NavItem>
    </NavigationContainer>
  )
}
