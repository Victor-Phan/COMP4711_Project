const bcrypt = require("bcrypt");
const { userModel } = require("../models");

const saltRounds = process.env.SALT_ROUNDS || 10;

const encryptPassword = async (pw) => {
  try {
    const encrypted = await new Promise((res, rej) => {
      bcrypt.hash(pw, saltRounds).then(res).catch(rej);
    });
    return encrypted;
  } catch (e) {
    throw e;
  }
};

const isPasswordValid = async (input, pw) => {
  try {
    const result = await new Promise((res, rej) => {
      bcrypt.compare(input, pw).then(res).catch(rej);
    });
    return result;
  } catch (e) {
    throw e;
  }
};

exports.register = async (req, res, next) => {
  try {
    const newUser = { ...req.session.user, ...req.body };
    newUser.password = await encryptPassword(newUser.password);

    console.log(newUser)

    const { insertId } = await userModel.insertUser(newUser);
    console.log(insertId)
    req.session.user = { email: newUser.email, id: insertId };
    return res.redirect("/");
  } catch (e) {
    next({ ...e, message: "Error registering user" });
  }
};

exports.signup = async (req, res, next) => {
  req.session.user = req.body;
  return res.render("signupPage", { signupCSS: true });
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await userModel.getUserByEmail(email);

    if (data.length == 0) {
      throw new Error("No such user");
    }

    const validUser = data[0];
    if (!(await isPasswordValid(password, validUser.password)))
      throw new Error("Invalid password");

    req.session.user = { email: validUser.email, id: validUser.id };
    return res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.signinPage = (req, res) => res.render("landingPage", {});

exports.signout = (req, res) => {
  req.session.destroy(() => console.log("User signed out"));
  return res.redirect("/signin");
};
