const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
dotenv.config({ path: "./config.env" });
require("./DB/conn");
const cookieParser = require("cookie-parser");
app.use("/public", express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(require("./Router/router"));
app.use(cors());

const PORT = process.env.PORT;

app.get("/register", (req, res) => {
  res.send("this is register page");
});
// app.get('/login' , (req ,res)=>{
//     res.send("this is login page");
// })

app.listen(PORT, () => {
  console.log("Server has started");
});
