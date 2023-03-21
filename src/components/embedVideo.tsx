import React from 'react'
import {
  NotEditable,
  component,
  fields,
} from '@keystone-6/fields-document/component-blocks'
import { getYouTubeEmbedId } from '../util/getEmbedId'

export const componentBlocks = {
  embedVideo: component({
    preview: (props) => {
      const embedId = getYouTubeEmbedId(props.fields.link.value)
      return (
        <NotEditable>
          <iframe
            title={props.fields.videoTitle.value}
            width="420"
            height="315"
            src={`https://youtube.com/embed/${embedId}`}></iframe>
        </NotEditable>
      )
    },
    label: 'Embed YouTube Video',
    schema: {
      videoTitle: fields.text({
        label: 'Title',
      }),
      link: fields.text({
        label: 'YouTube Video URL',
      }),
    },
  }),
}
