import NotFound from "../errors/NotFound.js";
import { teacher } from "../models/Teacher.js";

class TeacherController{
  static async listTeachers(req, res, next) {
    try {
      const teachersList = await teacher.find({});
      res.status(200).json(teachersList);
    } catch (error) {
      next(error);
    }
  }

  static async listTeacherById(req, res, next) {
    try {
      const id = req.params.id;
      const teacherRetrieved = await teacher.findById(id);

      if (teacherRetrieved !== null) {
        res.status(200).json(teacherRetrieved);
      } else {
        next(new NotFound("Id not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listTeacherByName(req, res, next) {
    // This method is able to fetch a teacher by giving part of their name.
    try {
      const searchingName = req.query.name;
      const matchingTeachers = await teacher.find({ name: { $regex: new RegExp(searchingName, "i")} });

      if (Array.isArray(matchingTeachers) && matchingTeachers.length === 0) {
        next(new NotFound("No matching teachers were found"));
      } else {
        res.status(200).json(matchingTeachers);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createTeacher(req, res, next) {
    try {
      const newTeacher = await teacher.create(req.body);
      res.status(201).json( { message: "Created successfully", newTeacher });
    } catch (error) {
      next(error);
    }
  }

  static async updateTeacher(req, res, next) {
    try {
      const id = req.params.id;
      await teacher.findByIdAndUpdate(id, req.body);
      const updatedTeacher = await teacher.findById(id);
      res.status(200).json({ message: "Teacher update", updatedTeacher: updatedTeacher });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTeacher(req, res, next) {
    try {
      const id = req.params.id;
      const deletedTeacher = await teacher.findById(id);
      await teacher.findByIdAndDelete(id);
      res.status(200).json({ message: "Teacher deleted", deletedTeacher: deletedTeacher });
    } catch (error) {
      next(error);
    }
  }
}

export default TeacherController;
