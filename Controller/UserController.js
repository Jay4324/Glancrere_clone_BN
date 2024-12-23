const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const userLogin = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ isSuccess: false, msg: "Please Provide all data" });
  }
  let user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).send({ isSuccess: false, msg: "user Not Found" });
  }
  let comparepassword = await user.comparePassword(password);
  console.log("compare password response ", comparepassword);
  if (!comparepassword) {
    return res
      .status(401)
      .send({ isSuccess: false, msg: "Invalid Credentials" });
  }
  const Token=jwt.sign({_id:user._id},process.env.SECRET_KEY)
res.cookie("user",Token)

  res.status(200).send({ isSuccess: true,msg:'User is Login Successfully' });
};
const userRegister = async (req, res) => {
  try {
    console.log("Registeration controller is being called", req.body);
    let { email, password, firstName, lastName, firm, country } = req.body;
    if (!email || !password || !firstName || !lastName || !firm || !country) {
      return res
        .status(400)
        .send({ isSuccess: false, msg: "Please Provide all Data" });
    }
    let existingUser = await userModel.findOne({ email });
    console.log("this is existing user details", existingUser);
    if (existingUser) {
      return res
        .status(400)
        .send({ isSuccess: false, msg: "Already Register User" });
    }
    let newUser = new userModel({ ...req.body });

    await newUser.save();

    res
      .status(201)
      .send({ isSuccess: true, msg: "User has been register ", newUser });
  } catch (err) {
    res.status(500).send({
      isSuccess: false,
      msg: "Internal Sever Error in User Register Controller",
    });
  }
};

const userProfile = async (req, res) => {
  try {
    let  _id = req.userId;
    console.log("user profile ",req.userId)
    let userData = await userModel.findOne({ _id }).select("-password");
    if (!userData) {
      return res.status(404).send({ isSuccess: false, msg: "User Not Found" });
    } else {
      console.log("sended data ",userData)
      return res.status(200).send({ isSuccess: true, userData });
    }
  } catch (err) {
    res.status(500).send({ isSuccess: false, err });
  }
};
const userLogout=(req,res)=>{
  try{
    res.clearCookie("user")
    res.status(200).send({isSuccess:true,msg:"user have been Logged Out"})
  

  }catch(err){
    res.status(500).send({isSuccess:false,err})
  }
}

module.exports = { userLogin, userRegister, userProfile ,userLogout};
