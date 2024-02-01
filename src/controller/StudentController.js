import NotFound from "../errors/NotFound.js";
import { student } from "../models/Student.js";

class StudentController {
  static async listStudents(req, res, next) {
    try {
      const studentsList = await student.find({}).populate("group").exec();
      res.status(200).json(studentsList);
    } catch (error) {
      next(error);
    }
  }

  static async listStudentById(req, res, next) {
    try {
      const id = req.params.id;
      const studentRetrieved = await student.findById(id);

      if (studentRetrieved !== null) {
        res.status(200).json(studentRetrieved);
      } else {
        next(new NotFound("Id not found"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async listStudentByName(req, res, next) {
    // This method is able to fetch a student by giving part of their name.
    try {
      const searchingName = req.query.name;
      const matchingStudents = await student.find({ name: { $regex: new RegExp(searchingName, "i")} });

      if (Array.isArray(matchingStudents) && matchingStudents.length === 0) {
        next(new NotFound("No matching students were found"));
      } else {
        res.status(200).json(matchingStudents);
      }

    } catch (error) {
      next(error);
    }
  }

  static async listStudentFromGroup(req, res, next) {
    try {
      const group = req.query.id;
      const matchingStudents = await student.find({ group: group });

      if (Array.isArray(matchingStudents) && matchingStudents.length === 0) {
        next(new NotFound("No students were found for the given group"));
      } else {
        res.status(200).json(matchingStudents);
      }

    } catch (error) {
      next(error);
    }
  }

  static async createStudent(req, res, next) {
    try {
      const newStudent = await student.create(req.body);
      res.status(201).json( { message: "Created successfully", newStudent });
    } catch (error) {
      next(error);
    }
  }

  static async updateStudent(req, res, next) {
    try {
      const id = req.params.id;
      await student.findByIdAndUpdate(id, req.body);
      const updatedStudent = await student.findById(id);
      res.status(200).json({ message: "Student update", updatedStudent: updatedStudent });
    } catch (error) {
      next(error);
    }
  }

  static async deleteStudent(req, res, next) {
    try {
      const id = req.params.id;
      const deletedStudent = await student.findById(id);
      await student.findByIdAndDelete(id);
      res.status(200).json({ message: "Student deleted", deletedStudent: deletedStudent });
    } catch (error) {
      next(error);
    }
  }
}

export default StudentController;
