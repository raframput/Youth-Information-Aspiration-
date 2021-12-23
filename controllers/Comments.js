const CommentModel = require("../models/CommentsModel");
const { validationResult } = require("express-validator");

class Comment {
  // Get All Comment
  static async getlistAllComment(req, res) {
    try {
      const CommentList = await CommentModel.find();
      res.status(200).send(CommentList);
    } catch (err) {
      res.status(500).send({
        message: err,
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
      res.status(200).send(CommentList);
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  }

  // TODO  Get Comment By news_id TODO
  static async getCommentByNews(req, res) {
    try {
      const news_id = req.params.news_id;
      const CommentList = await CommentModel.findOne({
        news_id: news_id,
      });
      res.status(200).send(CommentList);
    } catch (error) {
      res.status(500).send({ err: error.message });
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
        message: "Succes Created the Data",
        data: saved,
      });
    } catch (error) {
      res.status(500).send({ err: error.message, data: "Can't Create Data" });
    }
  }
  //   TODO Udpate Comment
  static async updateComment(req,res) {
    try {
      const id = req.params.id;
      const body = req.body;

      await CommentModel.findOneAndUpdate(
        { _id: id },
        body,
        { new: true },
      );
      res.status(200).json({ message: "Comment successfully Updated" });

    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  }


  //   Delete Comment
  static async deleteComment(req, res) {
    try {
      const id = req.params.id;
      await CommentModel.deleteOne({ _id: id });
      res.status(200).send({
        message: `${id} Has Been Deleted`,
      });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = Comment;
