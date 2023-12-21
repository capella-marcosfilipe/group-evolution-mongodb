import express from "express";
import teachers from "./teachersRoutes.js";
import groups from "./groupsRoutes.js";
import students from "./studentsRoutes.js";
import classRecords from "./classRecordRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Group Evolution API"));
  app.use(
    express.json(),
    teachers,
    students,
    groups,
    classRecords
  );
};

export default routes;
