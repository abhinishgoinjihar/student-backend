const bcrypt = require("bcryptjs");

const { createUser, getUser } = require("../db/user");

/***
 * @param {import("express").Request} req - Request Object
 * @param {import("express").Response} res - Response Object
 */
module.exports.register = async function (req, res) {
  try {
    const { name = null, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({ name, username, password: hashedPassword });

    return res.status(201).json({ message: "Register successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/***
 * @param {import("express").Request} req - Request Object
 * @param {import("express").Response} res - Response Object
 */
module.exports.login = async function (req, res) {
  try {
    const { username, password } = req.body;

    if (!password)
      return res.status(400).json({ message: "Password required" });

    const user = await getUser(username);

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return res.status(401).json({ message: "Incorrect password" });

    delete user.password;

    return res.status(200).json({ message: "Login Successful", data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
