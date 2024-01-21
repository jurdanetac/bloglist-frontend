import { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // notifications
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // creates a reference to the blog form
  const blogFormRef = useRef();

  // fetches blogs from server
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // checks if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // performs login and saves session to browser
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      console.log(`logged in successfully as ${user.username}`);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // performs logout and removes session from browser
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload();
    console.log("logged out successfully");
  };

  // generates a login form for the user
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>

      <Notification message={errorMessage} type="error" />

      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );

  // handles adding a blog
  const addBlog = (blog) => {
    // hide form
    blogFormRef.current.toggleVisibility();

    // logic for blog creation
    try {
      blogService.create(blog).then((createdBlog) => {
        console.log("created blog:", createdBlog);
        setBlogs(blogs.concat(createdBlog));
        console.log("blog created successfully");

        // show success to user
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    } catch (exception) {
      console.log("exception", exception);
    }
  };

  // generates a form page to add a blog for the user
  const blogForm = () => (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} />

      {user.name ? (
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      ) : null}

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <>{user === null ? loginForm() : blogForm()}</>;
};

export default App;
