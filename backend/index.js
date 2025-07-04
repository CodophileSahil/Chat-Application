import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from the app");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server listen at port 3000");
});
