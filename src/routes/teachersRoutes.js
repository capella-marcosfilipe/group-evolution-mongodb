import express from "express";
import TeacherController from "../controller/TeacherController.js";

const routes = express.Router();

routes
  .get("/teachers", TeacherController.listTeachers)
  .get("/teachers/search", TeacherController.listTeacherByName)
  .get("/teachers/:id", TeacherController.listTeacherById)
  .post("/teachers", TeacherController.createTeacher)
  .put("/teachers/:id", TeacherController.updateTeacher)
  .delete("/teachers/:id", TeacherController.deleteTeacher);

export default routes;
