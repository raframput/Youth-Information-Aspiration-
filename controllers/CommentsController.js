const CommentsModel = require("../models/CommentsModel");
const {Timestamp} = require('../helpers/timestamphelper');

class Comment {
  // Get All Comment
  static async getlistAllComment(req, res) {
    try {
      const CommentList = await CommentsModel.find().populate([
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
      const CommentList = await CommentsModel.findOne({
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
      const CommentList = await CommentsModel.findOne({
        news_id: news_id,
      }).populate([
        "user_id",
        "news_id",
        ]);
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

      const Comment = new CommentsModel({
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

      const updated = await CommentsModel.findOneAndUpdate(
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
      await CommentsModel.deleteOne({ _id: id });
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