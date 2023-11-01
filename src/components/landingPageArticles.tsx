import React from 'react'

import {
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types'

export function Field({ value }: FieldProps<any>) {
  if (value.length === 0) {
    return (
      <>
        <h4>Articles</h4>
        <p>No articles found</p>
      </>
    )
  }
  return (
    <>
      <h4>Articles</h4>
      <ul>
        {value.map((article: any) => (
          <li key={article.id}>
            <a
              href={`/articles/${article.id}`}
              target="_blank"
              rel="noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

// #TODO write properly typed controller for this view
// export const controller = (
//   config: FieldControllerConfig<JSONValue | undefined>
// ): FieldController<string | null, string> => {
//   return {
//     path: config.path,
//     label: config.label,
//     description: config.description,
//     graphqlSelection: config.path,
//     defaultValue: null,
//     deserialize: (data) => {
//       const value = data[config.path]
//       return typeof value === 'string' ? value : null
//     },
//     serialize: (value) => ({ [config.path]: value }),
//   }
// }
