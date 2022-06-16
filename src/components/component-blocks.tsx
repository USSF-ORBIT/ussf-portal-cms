import React from 'react'
import { component, fields } from '@keystone-6/fields-document/component-blocks'

export const componentBlocks = {
  callToAction: component({
    preview: (props) => {
      return <button type="button">CLICK ME</button>
    },
    label: 'Call To Action',
    schema: {},
  }),
}
