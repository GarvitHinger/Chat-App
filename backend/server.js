import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./db/connectDB.js";
import authRoute from './routes/authRoute.js';
import messageRoute from "./routes/messageRoute.js"
import userRoute from "./routes/userRoute.js"
import {app,server} from './socket/socket.js'

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("Hello World!!")
})

//routes
app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoute)
app.use("/api/users",userRoute)


app.use(express.static(path.join(__dirname, "/frontend/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    server.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error)
  }
}
start();