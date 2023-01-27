import { validateFile, resolveTitleInput } from './Document'

describe('Document', () => {
  describe('validateFile', () => {
    it('cannot create a new document if no file is uploaded', async () => {
      const input = {
        inputData: {
          title: 'A Title',
          description: 'a description',
        },
        resolvedData: {
          file: {},
          title: 'A Title',
          description: 'a description',
        },
        item: null,
        addValidationError: jest.fn(),
      }
      validateFile(input)

      expect(input.addValidationError).toBeCalledWith(
        'A valid file is required to create or update a document.'
      )
    })

    it('cannot update a document if the file is removed', async () => {
      const input = {
        inputData: { file: null },
        resolvedData: {
          file: { filename: null, filesize: null },
          title: 'A Title',
          description: 'a description',
        },
        item: {},
        addValidationError: jest.fn(),
      }
      validateFile(input)

      expect(input.addValidationError).toBeCalledWith(
        'A valid file is required to create or update a document.'
      )
    })

    it('keeps existing file if no file is included when updating document info', async () => {
      const existingFile = {
        file_filesize: 296096,
        file_filename: 'test-file.pdf',
      }

      const input = {
        inputData: { title: 'A new title', description: 'A new description' },
        resolvedData: {
          file: {},
          title: 'A new title',
          description: 'A new description',
        },
        item: existingFile,
        addValidationError: jest.fn(),
      }
      const result = validateFile(input)

      expect(result).toMatchObject(existingFile)
    })

    it('returns resolvedData.file by default', async () => {
      const input = {
        inputData: {
          title: 'A new title',
          description: 'A new description',
          file: {
            upload: {},
          },
        },
        resolvedData: {
          file: { file_filesize: 296096, file_filename: 'test-file.pdf' },
          title: 'A new title',
          description: 'A new description',
        },
        item: null,
        addValidationError: jest.fn(),
      }
      const result = validateFile(input)

      expect(result).toMatchObject(input.resolvedData.file)
    })
  })

  describe('resolveTitleInput', () => {
    it('creates a new doc and uses the filename as a title if no title provided', () => {
      const input = {
        inputData: {
          file: {
            upload: {},
          },
        },
        resolvedData: {
          file: { filename: 'test-file.pdf' },
          title: 'test-file.pdf',
        },
        item: {},
        fieldKey: 'title',
      }

      const result = resolveTitleInput(input)

      expect(result).toMatch(input.resolvedData.file.filename)
    })

    it('uploads a new file and submits an empty title', () => {
      const input = {
        inputData: {
          file: {
            upload: {},
          },
          title: '',
        },
        resolvedData: {
          file: { filename: 'test-file-updated.pdf' },
          title: 'test-file-updated.pdf',
        },
        item: { file_filename: 'test-file.pdf' },
        fieldKey: 'title',
      }

      const result = resolveTitleInput(input)

      expect(result).toMatch(input.resolvedData.file.filename)
    })

    it('edits and existing doc and submits an empty title', () => {
      const input = {
        inputData: {
          title: '',
        },
        resolvedData: {
          file: {},
          title: '',
        },
        item: { file_filename: 'test-file.pdf' },
        fieldKey: 'title',
      }

      const result = resolveTitleInput(input)

      expect(result).toMatch(input.item.file_filename)
    })

    it('returns resolved data if no special cases are detected', () => {
      const input = {
        inputData: {
          title: 'A new title',
          file: { upload: {} },
        },
        resolvedData: {
          file: {},
          title: 'A new title',
        },
        item: null,
        fieldKey: 'title',
      }

      const result = resolveTitleInput(input)

      expect(result).toMatch(input.resolvedData.title)
    })
    it('returns existing title if no new title is entered', () => {
      const input = {
        inputData: {
          file: { upload: {} },
        },
        resolvedData: {
          file: {},
        },
        item: {
          title: 'A document title',
        },
        fieldKey: 'title',
      }

      const result = resolveTitleInput(input)

      expect(result).toMatch(input.item.title)
    })
  })
})
