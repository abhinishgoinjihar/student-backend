const { connection } = require(".");

/**
 * @typedef {Object} CreateStudentProps
 * @property {string} rollNo
 * @property {string} regNo
 * @property {string} name
 * @property {string} email
 * @property {string} contact
 * @property {string | null} address
 * @property {string} faculty
 * @property {string} gender
 * @property {Date} dateofBirth
 * @property {Date} joinedDate
 */

/**
 *
 * @param {CreateStudentProps} body
 * @returns {Promise<void>}
 */
module.exports.createStudent = async function ({
  rollNo,
  regNo,
  name,
  email,
  contact,
  address,
  faculty,
  gender,
  dateOfBirth,
  joinedDate,
}) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO student (rollNo, regNo, name, email, contact, address, faculty, gender, dateOfBirth, joinedDate) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        rollNo,
        regNo,
        name,
        email,
        contact,
        address,
        faculty,
        gender,
        dateOfBirth,
        joinedDate,
      ],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      },
    );
  });
};

/**
 * @param {string} rollNo
 * @return {Promise<unknown>}
 */
module.exports.getStudentByRollNo = async function (rollNo) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM student WHERE rollNo = ?`,
      [rollNo],
      function (err, result) {
        if (err) {
          return reject(err);
        }
        if (!result.length) {
          return reject(new Error("Unable to fetch student"));
        }

        resolve(result[0]);
      },
    );
  });
};

/**
 * @return {Promise<Array<unknown>>}
 */
module.exports.getAllStudents = async function () {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM student`, function (err, result) {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};
