const express=require("express")
const Router=express.Router()
const {userRegister,userLogin,userProfile, userLogout}=require(".././Controller/UserController")
const {isAuth} =require("../Middleware/isAuth")
Router.post("/register",userRegister)
Router.post("/login",userLogin)
Router.get("/userProfile",isAuth,userProfile)
Router.delete("/userLogout",isAuth,userLogout)






module.exports=Router