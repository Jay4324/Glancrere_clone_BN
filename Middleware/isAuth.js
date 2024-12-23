const userModel = require("../Models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    let { user } = req.cookies;
    console.log("Inside Auth Middleware ", req.cookies.user);
    if (!user) {
      console.log("Invalid User", req.user);
      return res
        .status(401)
        .send({ isSuccess: false, msg: "Unauthorized User" });
    }
    let verifyUser = jwt.verify(user, process.env.SECRET_KEY);
    if (!verifyUser) {
      return res.status(401).send({ isSuccess: false, msg: "invalid User" });
    } else {
      req.userId = verifyUser._id;
      next();
    }
  } catch (err) {
    console.log("Error in IsAuth Middleware ", err);
    res.status(500).send({ isSuccess: false, err });
  }
};

module.exports = { isAuth };
