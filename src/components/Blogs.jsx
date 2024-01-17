import Blog from "./Blog";

const Blogs = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {user.name ? <p>{user.name} logged in</p> : null}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
