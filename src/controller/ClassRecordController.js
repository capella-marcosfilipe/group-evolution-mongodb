import { classRecord } from "../models/ClassRecord.js";

class ClassRecordController {
  static async listClassRecords(req, res) {
    try {
      const classRecords = await classRecord.find({}).populate("author").exec();
      res.status(200).json(classRecords);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listClassRecordById(req, res) {
    try {
      const id = req.params.id;
      const foundClassRecord = await classRecord.findById(id).populate("author").exec();
      res.status(200).json(foundClassRecord);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listClassRecordsFromGroup(req, res) {
    try {
      const group = req.query.id;
      const matchingRecords = await classRecord.find({ group: group }).populate("group").exec();
      res.status(200).json(matchingRecords);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listClassRecordsFromAuthor(req, res) {
    try {
      const author = req.query.id;
      const matchingRecords = await classRecord.find({ author: author });
      res.status(200).json(matchingRecords);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async createClassRecord(req, res) {
    try {
      const newClassRecord = await classRecord.create(req.body);
      res.status(201).json({ message: "Created successfully", classRecord: newClassRecord }); 
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't create` });
    }
  }

  static async updateClassRecord(req, res) {
    try {
      const id = req.params.id;
      await classRecord.findByIdAndUpdate(id, req.body);
      const updatedClassRecord = await classRecord.findById(id);
      res.status(200).json({ message: "ClassRecord updated", updatedClassRecord: updatedClassRecord });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't update` });
    }
  }

  static async deleteClassRecord(req, res) {
    try {
      const id = req.params.id;
      const deletedClassRecord = await classRecord.findById(id);
      await classRecord.findByIdAndDelete(id);
      res.status(200).json({ message: "ClassRecord deleted", deletedClassRecord: deletedClassRecord });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't delete` });
    }
  }
}

export default ClassRecordController;