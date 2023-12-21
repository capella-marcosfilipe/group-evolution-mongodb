import { student } from "../models/Student.js";

class StudentController {
  static async listStudents(req, res) {
    try {
      const studentsList = await student.find({}).populate("group").exec();
      res.status(200).json(studentsList);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listStudentById(req, res) {
    try {
      const id = req.params.id;
      const studentRetrieved = await student.findById(id);
      res.status(200).json(studentRetrieved);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listStudentByName(req, res) {
    // This method is able to fetch a student by giving part of their name.
    try {
      const searchingName = req.query.name;
      const matchingStudents = await student.find({ name: { $regex: new RegExp(searchingName, 'i')} });
      res.status(200).json(matchingStudents);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listStudentFromGroup(req, res) {
    try {
      const group = req.query.id;
      const matchingStudents = await student.find({ group: group });
      res.status(200).json(matchingStudents);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listStudentsFromGroupId(req, res) {
    const groupId = req.params.groupid;
    try {
      const studentsFromGroupId = await student.find( { group: groupId } );
      res.status(200).json(studentsFromGroupId);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async createStudent(req, res) {
    try {
      const newStudent = await student.create(req.body);
    res.status(201).json( { message: "Created successfully", newStudent });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't create` });
    }
  }

  static async updateStudent(req, res) {
    try {
      const id = req.params.id;
      await student.findByIdAndUpdate(id, req.body);
      const updatedStudent = await student.findById(id);
      res.status(200).json({ message: "Student update", updatedStudent: updatedStudent });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't update` });
    }
  }

  static async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      const deletedStudent = await student.findById(id);
      await student.findByIdAndDelete(id);
      res.status(200).json({ message: "Student deleted", deletedStudent: deletedStudent });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't delete` });
    }
  }
}

export default StudentController;
