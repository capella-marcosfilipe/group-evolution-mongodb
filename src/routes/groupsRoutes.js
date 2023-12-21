import express from "express";
import GroupController from "../controller/GroupController.js";

const routes = express.Router();

routes
  .get("/groups", GroupController.listGroups)
  .get("/groups/search", GroupController.listGroupBySchoolId)
  .get("/groups/:id", GroupController.listGroupById)
  .post("/groups", GroupController.createGroup)
  .put("/groups/:id", GroupController.updateGroup)
  .delete("/groups/:id", GroupController.deleteGroup);

export default routes;
