const DiscussionModel = require("../models/DiscussionModel");
const { validationResult } = require("express-validator");

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();

let Timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

class Discussions {
  
  static async createNewDiscussion(req, res) {
    try {
      DiscussionModel.create(req.body).then(function (dbDiscussion) {
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
      const discussionList = await DiscussionModel.find().populate([
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
      const discussionList = await DiscussionModel.findOne({ _id: id });
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
      const update = await DiscussionModel.updateOne({
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
      await DiscussionModel.deleteOne({ _id: id });
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
