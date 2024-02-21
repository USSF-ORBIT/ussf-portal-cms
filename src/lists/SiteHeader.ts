import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'
import { canCreateSiteHeader, canUpdateSiteHeader } from '../util/access'

const SiteHeader = list({
  access: {
    operation: {
      create: canCreateSiteHeader,
      query: () => true,
      update: canUpdateSiteHeader,
      delete: () => false,
    },
  },

  isSingleton: true,

  ui: {
    hideCreate: ({ session }) => !canCreateSiteHeader({ session }),
    hideDelete: true,
    itemView: {
      defaultFieldMode: 'edit',
    },
  },
  fields: {
    headerButtonLabel: text({
      defaultValue: 'News',
      validation: {
        isRequired: true,
      },
      label: 'Header button label',
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.headerButtonLabel &&
            resolvedData.headerButtonLabel.length > 30
          )
            throw new Error(
              'Header button label must be less than 30 characters'
            )
        },
      },
    }),
    headerButtonSource: text({
      defaultValue: '/news',
      validation: {
        isRequired: true,
      },
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
      label: 'Header button source',
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.headerButtonSource &&
            !resolvedData.headerButtonSource.match(/^\/\S*$/)
          )
            throw new Error(
              'The source must be a relative (/) URL from the portal.'
            )
        },
      },
    }),
    headerDropdownLabel: text({
      defaultValue: 'About us',
      validation: {
        isRequired: true,
      },
      label: 'Header dropdown label',
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.headerDropdownLabel &&
            resolvedData.headerDropdownLabel.length > 30
          )
            throw new Error(
              'Header dropdown label must be less than 30 characters'
            )
        },
      },
    }),
    dropdownItem1Label: text({
      defaultValue: 'About the USSF',
      validation: {
        isRequired: true,
      },
      label: 'Dropdown item 1 label',
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.dropdownItem1Label &&
            resolvedData.dropdownItem1Label.length > 30
          )
            throw new Error(
              'Dropdown item 1 label must be less than 30 characters'
            )
        },
      },
    }),
    dropdownItem1Source: text({
      defaultValue: '/about-us',
      validation: {
        isRequired: true,
        match: {
          regex: /^\/\S*$/,
          explanation: 'The source must be a relative (/) URL from the portal.',
        },
      },
      label: 'Dropdown item 1 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
    }),
    dropdownItem2Label: text({
      defaultValue: 'ORBIT blog',
      label: 'Dropdown item 2 label',
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.dropdownItem2Source &&
            !resolvedData.dropdownItem2Label
          ) {
            throw new Error(
              'Dropdown item 2 label is required when source is set'
            )
          }

          if (
            resolvedData.dropdownItem2Label &&
            resolvedData.dropdownItem2Label.length > 30
          )
            throw new Error(
              'Dropdown item 2 label must be less than 30 characters'
            )
        },
      },
    }),
    dropdownItem2Source: text({
      defaultValue: '/about-us/orbit-blog',
      label: 'Dropdown item 2 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.dropdownItem2Label &&
            !resolvedData.dropdownItem2Source
          ) {
            throw new Error(
              'Dropdown item 2 source is required when label is set'
            )
          }

          if (
            resolvedData.dropdownItem2Source &&
            !resolvedData.dropdownItem2Source.match(/^\/\S*$/)
          )
            throw new Error(
              'The source must be a relative (/) URL from the portal.'
            )
        },
      },
    }),
    dropdownItem3Label: text({
      label: 'Dropdown item 3 label',
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.dropdownItem3Source &&
            !resolvedData.dropdownItem3Label
          ) {
            throw new Error(
              'Dropdown item 3 label is required when source is set'
            )
          }

          if (
            resolvedData.dropdownItem3Label &&
            resolvedData.dropdownItem3Label.length > 30
          )
            throw new Error(
              'Dropdown item 3 label must be less than 30 characters'
            )
        },
      },
    }),
    dropdownItem3Source: text({
      label: 'Dropdown item 3 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.dropdownItem3Label &&
            !resolvedData.dropdownItem3Source
          ) {
            throw new Error(
              'Dropdown item 3 source is required when label is set'
            )
          }

          if (
            resolvedData.dropdownItem3Source &&
            !resolvedData.dropdownItem3Source.match(/^\/\S*$/)
          )
            throw new Error(
              'The source must be a relative (/) URL from the portal.'
            )
        },
      },
    }),
    dropdownItem4Label: text({
      label: 'Dropdown item 4 label',
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.dropdownItem4Source &&
            !resolvedData.dropdownItem4Label
          ) {
            throw new Error(
              'Dropdown item 4 label is required when source is set'
            )
          }

          if (
            resolvedData.dropdownItem4Label &&
            resolvedData.dropdownItem4Label.length > 30
          )
            throw new Error(
              'Dropdown item 4 label must be less than 30 characters'
            )
        },
      },
    }),
    dropdownItem4Source: text({
      label: 'Dropdown item 4 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
      hooks: {
        validateInput: async ({ resolvedData }) => {
          if (
            resolvedData.dropdownItem4Label &&
            !resolvedData.dropdownItem4Source
          ) {
            throw new Error(
              'Dropdown item 4 source is required when label is set'
            )
          }

          if (
            resolvedData.dropdownItem4Source &&
            !resolvedData.dropdownItem4Source.match(/^\/\S*$/)
          )
            throw new Error(
              'The source must be a relative (/) URL from the portal.'
            )
        },
      },
    }),
  },
})

export default SiteHeader
