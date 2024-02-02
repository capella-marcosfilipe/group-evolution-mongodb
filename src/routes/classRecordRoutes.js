import express from "express";
import ClassRecordController from "../controller/ClassRecordController.js";

const routes = express.Router();

routes
  .get("/class-records", ClassRecordController.listClassRecords)
  .get("/class-records/search", ClassRecordController.listClassRecordsByFilter)
  .get("/class-records/:id", ClassRecordController.listClassRecordById)
  .post("/class-records", ClassRecordController.createClassRecord)
  .put("/class-records/:id", ClassRecordController.updateClassRecord)
  .delete("/class-records/:id", ClassRecordController.deleteClassRecord);

export default routes;
