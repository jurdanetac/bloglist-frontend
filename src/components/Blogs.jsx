import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

const Blogs = ({ user, blogs, setBlogs }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload();
    console.log("logged out successfully");
  };

  return (
    <div>
      <h2>blogs</h2>
      {user.name ? (
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      ) : null}
      <CreateBlog blogs={blogs} setBlogs={setBlogs} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
