const DiscussionModel = require("../models/DiscussionModel");
const { validationResult } = require("express-validator");

class Discussions {
  static async createNewDiscussion(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("err: ", errors);
      res.status(400).json({
        message: "Request error",
        data: null,
      });
      return;
    }
    try {
      const body = req.body;
      const discussion_description = body.discussion_description;
      const discussion = new DiscussionModel({
        discussion_description: discussion_description,
      });
      const saved = await discussion.save();
      res.status(201).send(saved);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getAllDiscussion(req, res) {
    try {
      const discussionList = await DiscussionModel.find();
      res.status(200).send(discussionList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getDiscussionByID(req, res) {
    try {
      const id = req.params.id;
      const discussionList = await DiscussionModel.findOne({ _id: id });
      res.status(200).send(discussionList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updateDiscussion(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      const body = req.body;
      const discussion_description = body.discussion_description;
      await DiscussionModel.updateOne({
        discussion_description: discussion_description,
      });
      res.status(200).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deleteDiscussion(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      await DiscussionModel.deleteOne({ _id: id });
      res.status(200).send({ message: `${id} has been deleted ` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}
module.exports = Discussions;
