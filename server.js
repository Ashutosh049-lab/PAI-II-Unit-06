
const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db")
const { app } = require("./app"); 

dotenv.config();


app.use(express.json());
connectDB();

const PORT=process.env.PORT || 8081
app.listen(PORT,()=>{
    console.log("Server running");
})