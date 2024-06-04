const router = require("express").Router();

const { register, login } = require("../controllers/user");
const {
  getAllStudents,
  createStudent,
  getStudent,
} = require("../controllers/student");

router.post("/register", register);

router.post("/login", login);

router.get("/student", getAllStudents);

router.get("/student/:rollNo", getStudent);

router.post("/student", createStudent);

module.exports = router;
