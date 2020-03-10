const bcrypt = require("bcrypt");
const { user } = require("../models");

const saltRounds = process.env.SALT_ROUNDS || 10;

const encryptPassword = async pw => {
  try {
    const encrypted = await new Promise((res, rej) => {
      bcrypt
        .hash(pw, saltRounds)
        .then(res)
        .catch(rej);
    });
    return encrypted;
  } catch (e) {
    throw e;
  }
};

const isPasswordValid = async (input, pw) => {
  try {
    const result = await new Promise((res, rej) => {
      bcrypt
        .compare(input, pw)
        .then(res)
        .catch(rej);
    });
    return result;
  } catch (e) {
    throw e;
  }
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    newUser.password = await encryptPassword(newUser.password);

    await user.insertUser(newUser);
    req.session.user = { email: newUser.email };
    res.send(req.session.user);
  } catch (e) {
    next({ ...e, message: "Error signing user" });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await user.getUserByEmail(email);

    if (data.length == 0) throw new Error("No such user");

    const validUser = data[0];

    if (!(await isPasswordValid(password, validUser.password)))
      throw new Error("Invalid password");

    req.session.user = { email: validUser.email, id: validUser.id };
    res.send(req.session.user);
  } catch (e) {
    next(e);
  }
};

exports.signout = (req, res) => {
  req.session.destroy(() => console.log("User signed out"));
  res.redirect("/signin");
};
