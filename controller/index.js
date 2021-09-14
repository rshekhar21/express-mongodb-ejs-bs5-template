require("dotenv").config();
const model = require("../model");
const jwt = require("jsonwebtoken");
const log = console.log;
const maxAge = 3 * 24 * 60 * 60;
const secretKey = process.send.JWT_SECRET_KEY;

const createToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: maxAge });
};

const handelErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email")
    errors.email = "this email does not exist";

  if (err.message === "incorrect password")
    errors.password = "invalid password";

  if (err.code === 11000) {
    errors.email = "this email is already in use";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const login = (req, res) => {};

const signup = (req, res) => {};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { login, signup, logout };
