const {
  getStudentByRollNo,
  getAllStudents,
  createStudent,
} = require("../db/student");

/***
 * @param {import("express").Request} req - Request Object
 * @param {import("express").Response} res - Response Object
 */
module.exports.getStudent = async function (req, res) {
  try {
    const { rollNo } = req.params;

    const student = await getStudentByRollNo(rollNo);

    return res.status(200).json({ message: "Student fetched", data: student });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/***
 * @param {import("express").Request} req - Request Object
 * @param {import("express").Response} res - Response Object
 */
module.exports.getAllStudents = async function (req, res) {
  try {
    const search = req.query?.search;

    const students = await getAllStudents({ search });

    return res
      .status(200)
      .json({ message: "Students fetched", result: students });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/***
 * @param {import("express").Request} req - Request Object
 * @param {import("express").Response} res - Response Object
 */
module.exports.createStudent = async function (req, res) {
  try {
    const {
      rollNo,
      regNo,
      name,
      email,
      contact,
      address = null,
      faculty,
      gender,
      dateOfBirth,
      joinedDate,
    } = req.body;

    await createStudent({
      rollNo,
      regNo,
      name,
      email,
      contact,
      address,
      faculty,
      gender,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      joinedDate: joinedDate ? new Date(joinedDate) : undefined,
    });

    return res.status(201).json({ message: "Student created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
