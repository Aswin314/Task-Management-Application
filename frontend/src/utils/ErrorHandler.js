export const handleError = (err) => {
  if (err.response) {
    return err.response.data.message || "Something went wrong";
  } else if (err.request) {
    return "Server not responding";
  } else {
    return err.message;
  }
};
