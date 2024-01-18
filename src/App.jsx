import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {errorMessage ? <ErrorMessage /> : null}
      {user ? (
        <Blogs user={user} blogs={blogs} setBlogs={setBlogs} />
      ) : (
        <LoginForm
          setUser={setUser}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default App;
