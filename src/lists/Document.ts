import { list } from '@keystone-6/core'
import { file, text } from '@keystone-6/core/fields'

import {
  canCreateOrUpdateDocument,
  canDeleteDocument,
  canUpdateDocument,
  documentCreateView,
  documentItemView,
} from '../util/access'
import { withTracking } from '../util/tracking'
import { isLocalStorage } from '../util/getStorage'

const Document = list(
  withTracking({
    access: {
      operation: {
        create: (session) => canCreateOrUpdateDocument(session),
        query: () => true,
        update: (session) => canCreateOrUpdateDocument(session),
        delete: (session) => canDeleteDocument(session),
      },
      filter: {
        update: canUpdateDocument,
        delete: canUpdateDocument,
      },
    },

    ui: {
      hideCreate: (session) => !canCreateOrUpdateDocument(session),
      hideDelete: (session) => !canDeleteDocument(session),
      createView: {
        defaultFieldMode: documentCreateView,
      },
      itemView: {
        defaultFieldMode: documentItemView,
      },
      listView: {
        initialColumns: ['title', 'file'],
      },
    },

    fields: {
      file: file({
        storage: isLocalStorage() ? 'local_files' : 'cms_files',
        hooks: {
          validateInput: (args) => validateFile(args),
        },
      }),
      title: text({
        hooks: {
          resolveInput: (args) => resolveTitleInput(args),
        },
      }),

      description: text(),
    },
  })
)

export const validateFile = ({
  inputData,
  resolvedData,
  item,
  addValidationError,
}: any) => {
  //#todo Figure out access to keystone types for this ListHook and replace 'any'
  const { file } = resolvedData

  // Scenario 1: A file is not included in input data,
  // and there is no file saved in the database
  // Return error that a file is required
  if (file['filesize'] === undefined && item?.file_filesize === undefined) {
    addValidationError(
      'A valid file is required to create or update a document.'
    )
    return resolvedData.file
  }

  // Scenario 2: A file is saved already, but the user
  // tries to remove it and save the document.
  if (inputData.file === null) {
    addValidationError(
      'A valid file is required to create or update a document.'
    )
    return resolvedData.file
  }

  // Scenario 3: A file is not included in input data,
  // but there is a file saved already. Return that file.
  if (file['filesize'] === undefined && item?.file_filesize) {
    return item
  }
  // By default, return resolved data
  return resolvedData.file
}

export const resolveTitleInput = ({ inputData, resolvedData, item }: any) => {
  //#todo Figure out access to keystone types for this ListHook and replace 'any'
  const newFile = inputData.file?.upload
  const updatedFile = newFile && item?.file_filename
  const existingFile = item?.file_filename
  const noTitleInput = inputData.title === undefined
  const removeTitle = inputData.title === ''
  const existingTitle = item?.title

  // Scenario 1:
  // No title input
  // A new file is uploaded
  if (noTitleInput && newFile) {
    // If the document is being updated, there may be an existing title
    if (existingTitle) return existingTitle

    // If it is a new document and/or there is no existing title, use the filename
    return resolvedData.file.filename
  }

  // Scenario 2:
  // Title is removed and document is saved
  // A new file may or may not be uploaded
  // Use the filename as a new title
  if (removeTitle && updatedFile) {
    return resolvedData.file.filename
  }

  if (removeTitle && existingFile) {
    return item?.file_filename.toString()
  }

  // By default, always return resolvedData
  return resolvedData.title
}

export default Document
