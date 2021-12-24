const CommentModel = require("../models/CommentsModel");
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

class Comment {
  // Get All Comment
  static async getlistAllComment(req, res) {
    try {
      const CommentList = await CommentModel.find().populate([
        "user_id",
        "news_id",
        ]);
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get All Comment",
          time: Timestamp,
        },
          data: {
            Comment : CommentList
          }
      });
    } catch (err) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Comment",
          time: Timestamp,
        },
          data: {
            Comment : err
          }
      });
    }
  }

  // Get Comment by id
  static async getCommentById(req, res) {
    try {
      const id = req.params.id;
      const CommentList = await CommentModel.findOne({
        _id: id,
      });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get Comment by Id",
          time: Timestamp,
        },
          data: {
            Comment : CommentList
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Comment by Id",
          time: Timestamp,
        },
          data: {
            Comment : error
          }
      });
    }
  }

  // TODO  Get Comment By news_id TODO
  static async getCommentByNews(req, res) {
    try {
      const news_id = req.params.news_id;
      const CommentList = await CommentModel.findOne({
        news_id: news_id,
      });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get Comment by News",
          time: Timestamp,
        },
          data: {
            Comment : CommentList
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Comment by News",
          time: Timestamp,
        },
          data: {
            Comment : error
          }
      });
    }
  }

  //   Create Comment
  static async createComment(req, res) {
    try {
      const body = req.body;
      const user_id = body.user_id;
      const news_id = body.news_id;
      const commentDesc = body.comment_description;

      const Comment = new CommentModel({
        user_id: user_id,
        news_id: news_id,
        comment_description: commentDesc,
      });
      const saved = await Comment.save();
      res.status(201).send({
        meta: {
          status: "Success",
          message: "Post Comment",
          time: Timestamp,
        },
          data: {
            Comment : saved
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Comment",
          time: Timestamp,
        },
          data: {
            Comment : error
          }
      });
    }
  }
  //   TODO Udpate Comment
  static async updateComment(req,res) {
    try {
      const id = req.params.id;
      const body = req.body;

      const updated = await CommentModel.findOneAndUpdate(
        { _id: id },
        body,
        { new: true },
      );
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated Comment",
          time: Timestamp,
        },
          data: {
            Comment : updated
          }
      });

    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Updated Comment",
          time: Timestamp,
        },
          data: {
            Comment : error
          }
      });
    }
  }


  //   Delete Comment
  static async deleteComment(req, res) {
    try {
      const id = req.params.id;
      await CommentModel.deleteOne({ _id: id });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Delete Comment",
          time: Timestamp,
        },
          data: {
            Comment : `${id} has been deleted `
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Delete Comment",
          time: Timestamp,
        },
          data: {
            Comment : error
          }
      });
    }
  }
}

module.exports = Comment;
