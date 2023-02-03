import React from 'react'
import {
  NotEditable,
  component,
  fields,
} from '@keystone-6/fields-document/component-blocks'

export const componentBlocks = {
  embedVideo: component({
    preview: (props) => {
      return (
        <NotEditable>
          <iframe
            title={props.fields.videoTitle.value}
            width="420"
            height="315"
            src={`https://youtube.com/embed/${props.fields.link.value}`}></iframe>
        </NotEditable>
      )
    },
    label: 'Embed Video',
    schema: {
      videoTitle: fields.text({
        label: 'Title',
      }),
      link: fields.text({
        label: 'Insert link',
      }),
    },
  }),
}
