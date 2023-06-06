import type { AdminConfig } from '@keystone-6/core/types'
import { CustomNavigation } from './components/CustomNavigation'
import { CustomLogo } from './components/CustomLogo'

export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation,
  Logo: CustomLogo,
}
