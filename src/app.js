import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsHandler from "./middlewares/errorsHandler.js";
import notFoundHandler from "./middlewares/NotFoundHandler.js";

const connection = await connectDatabase();

connection.on("error", (err) => {
  console.error("Connection error", err);
});

connection.once("open", () => {
  console.log("Database connected sucessfully!");
});

const app = express();
routes(app);

app.use(notFoundHandler);
app.use(errorsHandler);

export default app;
