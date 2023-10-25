const checkResponseStatus = response => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
};

module.exports = checkResponseStatus;
