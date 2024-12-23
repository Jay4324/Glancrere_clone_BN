// import packages
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./Database/dbconfig");
// create server
const app = express();
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"

}));
app.use(cookieParser());
// app.use(
//   session({
//     secret: "session",
//     resave:false,
   
//     saveUninitialized: true,
//     cookie: { maxAge: 600000,secure:false },
  
//   })
// );
app.use(express.json());
app.use((req,res,next)=>{
    console.log("req data ",req.session)
    next()
})

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`PORT IS LISTEN ON ${process.env.PORT}`);
});
