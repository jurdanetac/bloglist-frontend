import ErrorMessage from "./ErrorMessage";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = (props) => {
  const {
    setUser,
    username,
    password,
    setUsername,
    setPassword,
    errorMessage,
    setErrorMessage,
  } = props;

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

  return (
    <>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            autoComplete="on"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            autoComplete="on"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
