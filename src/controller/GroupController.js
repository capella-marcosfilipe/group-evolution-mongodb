import { group } from "../models/Group.js";

class GroupController {
  static async listGroups(req, res) {
    try {
      const groupsList = await group.find({});
      res.status(200).json(groupsList);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listGroupById(req, res) {
    try {
      const id = req.params.id;
      const foundGroup = await group.findById(id);
      res.status(200).json(foundGroup);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async listGroupBySchoolId(req, res) {
    try {
      const schoolId = req.query.schoolId;
      const foundGroup = await group.find({ schoolId: schoolId });
      res.status(200).json(foundGroup);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't retrieve` });
    }
  }

  static async createGroup(req, res) {
    try {
      const newGroup = await group.create(req.body);
      res.status(201).json({ message: "Created successfully", group: newGroup }); 
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't create` });
    }
  }

  static async updateGroup(req, res) {
    try {
      const id = req.params.id;
      await group.findByIdAndUpdate(id, req.body);
      const updatedGroup = await group.findById(id);
      res.status(200).json({ message: "Group updated", updatedGroup: updatedGroup });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't update` });
    }
  }

  static async deleteGroup(req, res) {
    try {
      const id = req.params.id;
      const deletedGroup = await group.findById(id);
      await group.findByIdAndDelete(id);
      res.status(200).json({ message: "Group deleted", deletedGroup: deletedGroup });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Couldn't delete` });
    }
  }
}

export default GroupController;