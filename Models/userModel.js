const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = Mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firm: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    // required: true,
    default: true,
  },
});
userModel.pre("save", async function (next) {
  // console.log("pre save of register is being called ",this)
  if (!this.isModified(this.password) && !this.isNew) {
    // console.log("inside not modified password")
    next();
  } else {
    // console.log("indside modified password")
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});
userModel.methods.comparePassword = async function (password) {
  console.log(
    "chcking normal  pass \n",
    password,
    "\n salted password",
    this.password
  );
  let checkPassword = bcrypt.compareSync(password, this.password);
  return checkPassword;
};

module.exports = Mongoose.model("userModel", userModel);
