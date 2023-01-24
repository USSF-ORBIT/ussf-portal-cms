import { list } from '@keystone-6/core'
import { file, text } from '@keystone-6/core/fields'

import {
  isAdmin,
  editReadAdminUI,
  documentOperationAccess,
} from '../util/access'
import { withTracking } from '../util/tracking'
import { isLocalStorage } from '../util/getStorage'

const Document = list(
  withTracking({
    access: {
      operation: {
        create: (session) => documentOperationAccess(session),
        query: (session) => documentOperationAccess(session),
        update: (session) => documentOperationAccess(session),
        delete: (session) => documentOperationAccess(session),
      },
    },

    ui: {
      hideCreate: ({ session }) => !isAdmin({ session }),

      itemView: {
        defaultFieldMode: editReadAdminUI,
      },
    },

    fields: {
      file: file({
        storage: isLocalStorage() ? 'local_files' : 'cms_files',
        hooks: {
          validateInput: ({
            inputData,
            resolvedData,
            item,
            addValidationError,
          }) => {
            const { file } = resolvedData

            // Scenario 1: A file is not included in input data,
            // and there is no file saved in the database
            // Return error that a file is required
            // resolvedData.file = {}
            // item = null
            if (
              file['filesize'] === undefined &&
              item?.file_filesize === undefined
            ) {
              addValidationError(
                'A valid file is required to create or update a document.'
              )
              return resolvedData.file
            }

            // Scenario 2: A file is saved already, but the user
            // tries to remove it and save the document.
            // inputData = {"file":null}
            if (inputData.file === null) {
              addValidationError(
                'A valid file is required to create or update a document.'
              )
              return resolvedData.file
            }

            // Scenario 3: A file is not included in input data,
            // but there is a file saved already. Return that file.
            // resolvedData.file === undefined
            if (file['filesize'] === undefined && item?.file_filesize) {
              return item
            }

            return resolvedData.file
          },
        },
      }),
      title: text({
        hooks: {
          resolveInput: ({ inputData, resolvedData, item, fieldKey }) => {
            const filename = item?.['file_filename'] as object

            // Scenario 1:
            // There is no title submitted, but there is an existing file.
            // Use the file name as the title
            // inputData.title === undefined
            // item.file_filename.length > 0

            if (
              (inputData.title === undefined || inputData.title === '') &&
              filename &&
              filename.toString().length > 0
            ) {
              return (fieldKey = filename.toString())
            }

            // Scenario 2:
            // A new title is submitted

            if (resolvedData.title.length > 0) {
              return (fieldKey = resolvedData.title)
            }
            // #TODO write tests for these scenarios
            // Scenario 3:
            // A new title and a new file are submitted
            // Validation for file takes place in file hook

            return resolvedData.fieldKey
          },
        },
      }),

      description: text(),
    },
  })
)

export default Document
