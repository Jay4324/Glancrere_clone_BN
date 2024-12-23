const Mongoose=require("mongoose")
require("dotenv").config()
Mongoose.connect(process.env.MONGODB_CONNECTION).then((data)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("error while connecting Mongodb",err)
})