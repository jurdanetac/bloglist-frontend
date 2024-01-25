import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders correct initial content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    url: 'https://react.dev/',
    likes: 5,
  }

  const user = {
    username: 'Jest',
  }

  const { container } = render(<Blog blog={blog} handleLike={() => {}} handleDelete={() => {}} user={user} />)

  // locate the div that contains the blog
  const div = container.querySelector('.blog')
  const togglableDiv = container.querySelector('.togglableContent')

  // check that the togglable content div was not rendered
  expect(togglableDiv).toBe(null)

  // check that title and author are rendered
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)

  // check that url and likes are not rendered
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
})
