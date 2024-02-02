import NotFound from "../errors/NotFound.js";
import { classRecord } from "../models/ClassRecord.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";

class ClassRecordController {
  static async listClassRecords(req, res, next) {
    try {
      let { limit = 10, page = 1, orderBy = "date:-1" } = req.query;

      let [orderingField, order] = orderBy.split(":");

      limit = parseInt(limit);
      page = parseInt(page);
      order = parseInt(order);

      if (limit > 0 && page > 0) {
        const classRecords = await classRecord
          .find({})
          .sort({ [orderingField]: order })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("author")
          .exec();
        res.status(200).json(classRecords);
      } else {
        next(new IncorrectRequest());
      }
    } catch (error) {
      next(error);
    }
  }

  static async listClassRecordById(req, res, next) {
    try {
      const id = req.params.id;
      const foundClassRecord = await classRecord
        .findById(id)
        .populate("author")
        .exec();

      if (foundClassRecord !== null) {
        res.status(200).json(foundClassRecord);
      } else {
        next(new NotFound("Id not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listClassRecordsByFilter(req, res, next) {
    const { author, group } = req.query;

    let query = {};

    if (author) query.author = author;
    if (group) query.group = group;

    try {
      const classRecords = await classRecord.find(query).exec();
      res.status(200).json(classRecords);
    } catch (error) {
      next(error);
    }
  }

  static async createClassRecord(req, res, next) {
    try {
      const newClassRecord = await classRecord.create(req.body);
      res
        .status(201)
        .json({ message: "Created successfully", classRecord: newClassRecord });
    } catch (error) {
      next(error);
    }
  }

  static async updateClassRecord(req, res, next) {
    try {
      const id = req.params.id;
      await classRecord.findByIdAndUpdate(id, req.body);
      const updatedClassRecord = await classRecord.findById(id);
      res.status(200).json({
        message: "ClassRecord updated",
        updatedClassRecord: updatedClassRecord,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteClassRecord(req, res, next) {
    try {
      const id = req.params.id;
      const deletedClassRecord = await classRecord.findById(id);
      await classRecord.findByIdAndDelete(id);
      res.status(200).json({
        message: "ClassRecord deleted",
        deletedClassRecord: deletedClassRecord,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ClassRecordController;
