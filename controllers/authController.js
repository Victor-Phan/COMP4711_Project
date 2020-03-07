const { user } = require("../models");

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    await user.insertUser(newUser);
    res.send(newUser);
  } catch (e) {
    next({ ...e, message: "Error signing user" });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await user.getUserByEmail(email);
    const validUser = data[0];
    if (data.length == 0) throw new Error("No such user");
    if (password !== validUser.password) throw new Error("Invalid password");
    res.send(validUser);
  } catch (e) {
    next(e);
  }
};
