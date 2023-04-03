export default {
  get: function (url, header = {}, data = "") {
    const opts = {};
    return new Promise(function (resolve, reject) {
      fetch(url, opts)
        // .then((response) => response.json())
        .then(function (data) {
          resolve(data);
        })
        .catch((error) => {
          let err = {
            resError: error,
            message: "Server not responding!",
          };
          reject(err);
        });
    });
  },
  post: function (url_path, body, header = {}) {
    return new Promise(function (resolve, reject) {
      try {
        fetch(url_path, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...body }),
        })
          .then((res) => res.json())
          .then(function (data) {
            resolve(data);
          });
      } catch (error) {
        let err = {
          resError: error,
          message: "Server not responding!",
        };
        reject(err);
      }
    });
  },
};
