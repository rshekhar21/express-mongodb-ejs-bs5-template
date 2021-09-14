const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const collectionName = ""; // should be singular eg user, customer etc.
const log = console.log;

const modelSchema = new schema({}, { timestamps: true }); // define your schema
const model = mongoose.model(collectionName, modelSchema);

modelSchema.pre("save", async (next) => {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

modelSchema.statics.login = async function (email, password, id = "") {
  // const user = await this.findOne({ email });
  const user = await this.findOne({ $or: [{ _id: id }, email] });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

modelSchema.statics.changePassword = async function (email, password, id = "") {
  // const user = await this.findById(id);
  const user = await this.findOne({ $or: [{ _id: id }, email] });
  if (user) {
    const salt = await bcrypt.genSalt();
    const pwd = await bcrypt.hash(password, salt);
    const result = await this.findByIdAndUpdate(id, { password: pwd });
    if (result) return result;
    throw Error("password not chagned");
  }
  throw Error("password not chagned");
};

module.exports = model;
