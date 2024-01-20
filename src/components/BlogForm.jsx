import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setNotification, createBlogRef }) => {
  const handleBlogForm = (event) => {
    event.preventDefault();

    console.log("creating new blog");
    const blog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.URL.value,
    };
    console.log("blog", blog);

    createBlogRef.current.toggleVisibility();

    try {
      blogService.create(blog).then((createdBlog) => {
        console.log("createdBlog", createdBlog);
        setBlogs(blogs.concat(createdBlog));
        console.log("blog created successfully");
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

    event.target.Title.value = "";
    event.target.Author.value = "";
    event.target.URL.value = "";
  };

  let title = "";
  let author = "";
  let url = "";

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogForm}>
        <div>
          title:{" "}
          <input
            type="text"
            defaultValue={title}
            name="Title"
            autoComplete="on"
            onChange={({ target }) => (title = target.value)}
            required
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            defaultValue={author}
            name="Author"
            autoComplete="on"
            onChange={({ target }) => (author = target.value)}
            required
          />
        </div>
        <div>
          url:{" "}
          <input
            type="url"
            defaultValue={url}
            name="URL"
            autoComplete="on"
            onChange={({ target }) => (url = target.value)}
            required
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
