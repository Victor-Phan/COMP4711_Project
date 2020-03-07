const { user } = require("../models");

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    await user.insertUser(newUser);
    req.session.user = { email: newUser.email };
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

    req.session.user = { email: validUser.email, id: validUser.id };
    res.send(validUser);
  } catch (e) {
    next(e);
  }
};

exports.signout = (req, res) => {
  req.session.destroy(() => console.log("User signed out"));
  res.redirect("/login");
};
