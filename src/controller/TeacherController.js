import { teacher } from "../models/Teacher.js";

class TeacherController{
  static async listTeachers(req, res) {
    try {
      const teachersList = await teacher.find({});
      res.status(200).json(teachersList);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listTeacherById(req, res) {
    try {
      const id = req.params.id;
      const teacherRetrieved = await teacher.findById(id);
      res.status(200).json(teacherRetrieved);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listTeacherByName(req, res) {
    // This method is able to fetch a teacher by giving part of their name.
    try {
      const searchingName = req.query.name;
      const matchingTeachers = await teacher.find({ name: { $regex: new RegExp(searchingName, 'i')} });
      res.status(200).json(matchingTeachers);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async createTeacher(req, res) {
    try {
      const newTeacher = await teacher.create(req.body);
    res.status(201).json( { message: "Created successfully", newTeacher });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't create` });
    }
  }

  static async updateTeacher(req, res) {
    try {
      const id = req.params.id;
      await teacher.findByIdAndUpdate(id, req.body);
      const updatedTeacher = await teacher.findById(id);
      res.status(200).json({ message: "Teacher update", updatedTeacher: updatedTeacher });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't update` });
    }
  }

  static async deleteTeacher(req, res) {
    try {
      const id = req.params.id;
      const deletedTeacher = await teacher.findById(id);
      await teacher.findByIdAndDelete(id);
      res.status(200).json({ message: "Teacher deleted", deletedTeacher: deletedTeacher });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't delete` });
    }
  }
}

export default TeacherController;
