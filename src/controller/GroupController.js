import NotFound from "../errors/NotFound.js";
import { group } from "../models/Group.js";

class GroupController {
  static async listGroups(req, res, next) {
    try {
      const groupsList = await group.find({});
      res.status(200).json(groupsList);
    } catch (error) {
      next(error);
    }
  }

  static async listGroupById(req, res, next) {
    try {
      const id = req.params.id;
      const foundGroup = await group.findById(id);

      if (foundGroup !== null) {
        res.status(200).json(foundGroup);
      } else {
        next(new NotFound("Id not found"));
      }

    } catch (error) {
      next(error);
    }
  }

  static async listGroupBySchoolId(req, res, next) {
    try {
      const schoolId = req.query.schoolId;
      const foundGroup = await group.find({ schoolId: schoolId });

      if(foundGroup !== null) {
        res.status(200).json(foundGroup);
      } else {
        next(new NotFound("Group not found by School Id"));
      }

    } catch (error) {
      next(error);
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