import React from 'react'
import { Button } from '@keystone-ui/button'

import {
  FieldController,
  FieldControllerConfig,
  FieldProps,
  JSONValue,
} from '@keystone-6/core/types'

export function Field({ value }: FieldProps<typeof controller>) {
  if (!value) {
    return null
  }
  // This is parsing and reading the JSON payload created in the virutal field
  // that uses this view.
  const { articlePreviewUrl: url, label, isPublished } = JSON.parse(value)
  return (
    <>
      <Button
        size="medium"
        tone="active"
        // This warning is a false positive since this isn't a file system open
        // call but a URL open call. The URL is constructed by our application and
        // limited to the pattern https://url.to.portal/articles/slug-value
        // The value is created in src/lists/Article.ts during the resolve
        // method of articleUrlPreviewButton field configuration
        // The only user input is the slug-value portion
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        onClick={() =>
          window.open(
            url,
            isPublished ? '_blank' : 'ussf_portal_article_preview'
          )
        }>
        {label}
      </Button>
      &nbsp;
      <span>
        <em>Be sure to save changes before previewing your article.</em>
      </span>
    </>
  )
}

export const controller = (
  config: FieldControllerConfig<JSONValue | undefined>
): FieldController<string | null, string> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: (data) => {
      const value = data[config.path]
      return typeof value === 'string' ? value : null
    },
    serialize: (value) => ({ [config.path]: value }),
  }
}
