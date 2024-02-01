import NotFound from "../errors/NotFound.js";
import { classRecord } from "../models/ClassRecord.js";

class ClassRecordController {
  static async listClassRecords(req, res, next) {
    try {
      const classRecords = await classRecord.find({}).populate("author").exec();
      res.status(200).json(classRecords);
    } catch (error) {
      next(error);
    }
  }

  static async listClassRecordById(req, res, next) {
    try {
      const id = req.params.id;
      const foundClassRecord = await classRecord.findById(id).populate("author").exec();

      if(foundClassRecord !== null) {
        res.status(200).json(foundClassRecord);
      } else {
        next(new NotFound("Id not found"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async listClassRecordsFromGroup(req, res, next) {
    try {
      const group = req.query.id;
      const matchingRecords = await classRecord.find({ group: group }).populate("group").exec();

      if(Array.isArray(matchingRecords) && matchingRecords.length === 0) {
        next(new NotFound("No matching class records were found"));
      } else {
        res.status(200).json(matchingRecords);
      }
      
    } catch (error) {
      next(error);
    }
  }

  static async listClassRecordsFromAuthor(req, res, next) {
    try {
      const author = req.query.id;
      const matchingRecords = await classRecord.find({ author: author });

      if(Array.isArray(matchingRecords) && matchingRecords.length === 0) {
        next(new NotFound("No matching class records were found"));
      } else {
        res.status(200).json(matchingRecords);
      }

    } catch (error) {
      next(error);
    }
  }

  static async createClassRecord(req, res, next) {
    try {
      const newClassRecord = await classRecord.create(req.body);
      res.status(201).json({ message: "Created successfully", classRecord: newClassRecord }); 
    } catch (error) {
      next(error);
    }
  }

  static async updateClassRecord(req, res, next) {
    try {
      const id = req.params.id;
      await classRecord.findByIdAndUpdate(id, req.body);
      const updatedClassRecord = await classRecord.findById(id);
      res.status(200).json({ message: "ClassRecord updated", updatedClassRecord: updatedClassRecord });
    } catch (error) {
      next(error);
    }
  }

  static async deleteClassRecord(req, res, next) {
    try {
      const id = req.params.id;
      const deletedClassRecord = await classRecord.findById(id);
      await classRecord.findByIdAndDelete(id);
      res.status(200).json({ message: "ClassRecord deleted", deletedClassRecord: deletedClassRecord });
    } catch (error) {
      next(error);
    }
  }
}

export default ClassRecordController;