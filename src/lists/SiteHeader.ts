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
    buttonLabel: text({
      validation: {
        isRequired: true,
        length: {
          max: 20,
        },
      },
      label: 'Button label',
    }),
    buttonSource: text({
      validation: {
        isRequired: true,
      },
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
      label: 'Button source',
    }),
    dropdownLabel: text({
      validation: {
        isRequired: true,
        length: {
          max: 20,
        },
      },
      label: 'Dropdown label',
    }),
    dropdownItem1Label: text({
      validation: {
        isRequired: true,
        length: {
          max: 20,
        },
      },
      label: 'Dropdown item 1 label',
    }),
    dropdownItem1Source: text({
      validation: {
        isRequired: true,
      },
      label: 'Dropdown item 1 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
    }),
    dropdownItem2Label: text({
      label: 'Dropdown item 2 label',
      validation: {
        length: {
          max: 20,
        },
      },
    }),
    dropdownItem2Source: text({
      label: 'Dropdown item 2 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
    }),
    dropdownItem3Label: text({
      label: 'Dropdown item 3 label',
      validation: {
        length: {
          max: 20,
        },
      },
    }),
    dropdownItem3Source: text({
      label: 'Dropdown item 3 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
    }),
    dropdownItem4Label: text({
      label: 'Dropdown item 4 label',
      validation: {
        length: {
          max: 20,
        },
      },
    }),
    dropdownItem4Source: text({
      label: 'Dropdown item 4 source',
      ui: {
        description: 'The source must be a relative (/) URL from the portal.',
      },
    }),
  },
})

export default SiteHeader
