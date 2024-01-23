import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  // blog form fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          required
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          required
        />
      </div>
      <div>
        url:{' '}
        <input
          type="url"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
          required
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
