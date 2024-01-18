const Notification = ({ message }) => {
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <h2 style={style}>{message}</h2>;
};

export default Notification;
