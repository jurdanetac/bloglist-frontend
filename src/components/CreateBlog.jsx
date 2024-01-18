import blogService from "../services/blogs";

const CreateBlog = ({ blogs, setBlogs }) => {
  const handleCreateBlog = (event) => {
    event.preventDefault();

    console.log("creating new blog");
    const blog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.URL.value,
    };
    console.log("blog", blog);

    blogService.create(blog).then((createdBlog) => {
      console.log("createdBlog", createdBlog);
      setBlogs(blogs.concat(createdBlog));
    });

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
      <form onSubmit={handleCreateBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            defaultValue={title}
            name="Title"
            autoComplete="on"
            onChange={({ target }) => (title = target.value)}
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
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
