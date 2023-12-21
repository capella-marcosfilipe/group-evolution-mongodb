import { classDiary } from "../models/ClassDiary.js";

class ClassDiaryController {
  static async listClassDiaries(req, res) {
    try {
      const classDiariesList = await classDiary.find({}).populate("group").populate("classRecords").exec();
      res.status(200).json(classDiariesList);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listClassDiaryById(req, res) {
    try {
      const id = req.params.id;
      const foundClassDiary = await classDiary.findById(id).populate("group").populate("classRecords").exec();
      res.status(200).json(foundClassDiary);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async createClassDiary(req, res) {
    try {
      const newClassDiary = await classDiary.create(req.body);
      res.status(201).json({ message: "Created successfully", classDiary: newClassDiary }); 
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't create` });
    }
  }

  static async updateClassDiary(req, res) {
    try {
      const id = req.params.id;
      await classDiary.findByIdAndUpdate(id, req.body);
      const updatedClassDiary = await classDiary.findById(id);
      res.status(200).json({ message: "ClassDiary updated", updatedClassDiary: updatedClassDiary });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't update` });
    }
  }

  static async deleteClassDiary(req, res) {
    try {
      const id = req.params.id;
      const deletedClassDiary = await classDiary.findById(id);
      await classDiary.findByIdAndDelete(id);
      res.status(200).json({ message: "ClassDiary deleted", deletedClassDiary: deletedClassDiary });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't delete` });
    }
  }
}

export default ClassDiaryController;