import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return <Blogs blogs={blogs} />;
};

export default App;
