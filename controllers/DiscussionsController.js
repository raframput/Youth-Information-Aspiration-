const DiscussionsModel = require("../models/DiscussionsModel");
const {Timestamp} = require('../helpers/timestamphelper');

class Discussions {
  
  static async createNewDiscussion(req, res) {
    try {
      DiscussionsModel.create(req.body).then(function (dbDiscussion) {
        res.json({
        meta: {
          status: "Success",
          message: "Post Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : dbDiscussion
          }
      });
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : error
          }
      });
    }
  }

  static async getAllDiscussion(req, res) {
    try {
      const discussionList = await DiscussionsModel.find().populate([
        "user_id",
        "aspiration_id",
      ]);
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get All Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : discussionList
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : error
          }
      });
    }
  }

  static async getDiscussionByID(req, res) {
    try {
      const id = req.params.id;
      const discussionList = await DiscussionsModel.findOne({ _id: id }).populate([
        "user_id",
        "aspiration_id",
      ]);
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get Discussion by Id",
          time: Timestamp,
        },
          data: {
            Discussion : discussionList
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Discussion by Id",
          time: Timestamp,
        },
          data: {
            Discussion : error
          }
      });
    }
  }

  static async updateDiscussion(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      const body = req.body;
      const discussion_description = body.discussion_description;
      const update = await DiscussionsModel.updateOne({
        discussion_description: discussion_description,
      });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Update Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : update
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Update Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : error
          }
      });
    }
  }

  static async deleteDiscussion(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      await DiscussionsModel.deleteOne({ _id: id });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Delete Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : `${id} has been deleted `
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Delete Discussion",
          time: Timestamp,
        },
          data: {
            Discussion : error
          }
      });
    }
  }
}
module.exports = Discussions;