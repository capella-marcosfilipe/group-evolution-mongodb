import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectDatabase();

connection.on("error", (err) => {
  console.error("Connection error", err);
});

connection.once("open", () => {
  console.log("Database connected sucessfully!");
});

const app = express();
routes(app);

export default app;
