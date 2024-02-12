import { list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'

const SiteHeader = list({
  access: {
    operation: {
      create: () => true,
      query: () => true,
      update: () => true,
      delete: () => false,
    },
  },

  isSingleton: true,

  ui: {
    hideCreate: false,
    hideDelete: true,
    itemView: {
      defaultFieldMode: 'read',
    },
  },
  fields: {
    buttonLabel: text({
      validation: {
        isRequired: true,
      },
      label: 'Button label',
    }),
    buttonSource: text({
      validation: {
        isRequired: true,
      },
      ui: {
        description:
          'The source must be a relative (/) or absolute (https://) URL from the portal.',
      },
      label: 'Button source',
    }),
    dropdownLabel: text({
      validation: {
        isRequired: true,
      },
      label: 'Dropdown label',
    }),
    dropdownItem1Label: text({
      validation: {
        isRequired: true,
      },
      label: 'Dropdown item 1 label',
    }),
    dropdownItem1Source: text({
      validation: {
        isRequired: true,
      },
      label: 'Dropdown item 1 source',
      ui: {
        description:
          'The source must be a relative (/) or absolute (https://) URL from the portal.',
      },
    }),
    dropdownItem2Label: text({
      label: 'Dropdown item 2 label',
    }),
    dropdownItem2Source: text({
      label: 'Dropdown item 2 source',
      ui: {
        description:
          'The source must be a relative (/) or absolute (https://) URL from the portal.',
      },
    }),
    dropdownItem3Label: text({
      label: 'Dropdown item 3 label',
    }),
    dropdownItem3Source: text({
      label: 'Dropdown item 3 source',
      ui: {
        description:
          'The source must be a relative (/) or absolute (https://) URL from the portal.',
      },
    }),
    dropdownItem4Label: text({
      label: 'Dropdown item 4 label',
    }),
    dropdownItem4Source: text({
      label: 'Dropdown item 4 source',
      ui: {
        description:
          'The source must be a relative (/) or absolute (https://) URL from the portal.',
      },
    }),
  },
})

export default SiteHeader
