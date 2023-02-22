/**
 * @jest-environment jsdom
 */
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import { FieldProps } from '@keystone-6/core/types'

import { Field, controller } from './views'

test('returns nothing if there is no data', async () => {
  // I'm only testing my custom view, I don't see a need to create
  // a full FieldProps object for that, and making the type checking
  // happy with a partial one was difficult
  const properties = { value: null } as FieldProps<typeof controller>
  expect(Field(properties)).toBeNull()
})

test('returns button with label and target when in preview mode', async () => {
  global.open = jest.fn()
  const user = userEvent.setup()

  // I'm only testing my custom view, I don't see a need to create
  // a full FieldProps object for that, and making the type checking
  // happy with a partial one was difficult
  const value = {
    articlePreviewUrl: 'http://url.to.portal/articles/slug-goes-here',
    label: 'Preview Article',
    isPublished: false,
  }
  const properties = { value: JSON.stringify(value) } as FieldProps<
    typeof controller
  >

  const element = Field(properties) as JSX.Element
  render(element)
  const button = screen.getByRole('button')
  expect(button).toHaveTextContent(value.label)
  await user.click(button)
  expect(global.open).toHaveBeenCalledWith(
    value.articlePreviewUrl,
    'ussf_portal_article_preview'
  )
})

test('returns button with label and target when in published mode', async () => {
  global.open = jest.fn()
  const user = userEvent.setup()

  // I'm only testing my custom view, I don't see a need to create
  // a full FieldProps object for that, and making the type checking
  // happy with a partial one was difficult
  const value = {
    articlePreviewUrl: 'http://url.to.portal/articles/slug-goes-here',
    label: 'View Article',
    isPublished: true,
  }
  const properties = { value: JSON.stringify(value) } as FieldProps<
    typeof controller
  >

  const element = Field(properties) as JSX.Element
  render(element)
  const button = screen.getByRole('button')
  expect(button).toHaveTextContent(value.label)
  await user.click(button)
  expect(global.open).toHaveBeenCalledWith(value.articlePreviewUrl, '_blank')
})
