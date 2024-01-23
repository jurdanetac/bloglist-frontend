import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible ? (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.author}</div>

          {blog.user.username === user.username ? (
            <button onClick={() => handleDelete(blog)}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Blog
