
const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB=require("./config/db")

dotenv.config();

const app=express();

app.use(express.json());
connectDB();

const PORT=process.env.PORT || 8081
app.listen(PORT,()=>{
    console.log("Server running");
})