import express from "express";
import StudentController from "../controller/StudentController.js";

const routes = express.Router();

routes
  .get("/students", StudentController.listStudents)
  .get("/students/search", StudentController.listStudentByName)
  .get("/students/group", StudentController.listStudentFromGroup)
  .get("/students/:id", StudentController.listStudentById)
  .post("/students", StudentController.createStudent)
  .put("/students/:id", StudentController.updateStudent)
  .delete("/students/:id", StudentController.deleteStudent);

export default routes;
