import { createRef } from "react";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Notification from "./Notification";
import Togglable from "./Togglable";

const Blogs = ({ user, blogs, setBlogs, notification, setNotification }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload();
    console.log("logged out successfully");
  };
  const createBlogRef = createRef();

  return (
    <div>
      <h2>blogs</h2>
      {notification ? <Notification message={notification} /> : null}
      {user.name ? (
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      ) : null}
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateBlog
          blogs={blogs}
          setBlogs={setBlogs}
          notification={notification}
          setNotification={setNotification}
          createBlogRef={createBlogRef}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
