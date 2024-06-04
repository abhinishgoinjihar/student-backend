const { connection } = require(".");

/**
 * @typedef {Object} CreateUserProps
 * @property {string | null} name
 * @property {string} username
 * @property {string} password
 */

/**
 *
 * @param {CreateUserProps} body
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 */
module.exports.createUser = async function ({ name, username, password }) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      return reject(new Error("Username and password are required"));
    }

    // Database query
    connection.query(
      "INSERT INTO user (name, username, password) VALUES (?, ?, ?)",
      [name, username, password],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};

/**
 *
 * @param {string} username
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 */
module.exports.getUser = async function (username) {
  return new Promise((resolve, reject) => {
    if (!username) {
      return reject(new Error("Username is required"));
    }

    // Database query
    connection.query(
      "SELECT * FROM user WHERE username = ?",
      [username],
      function (err, result) {
        if (err) {
          return reject(err);
        }
        if (!result.length) {
          return reject(new Error("Unable to fetch user"));
        }

        resolve(result[0]);
      }
    );
  });
};
