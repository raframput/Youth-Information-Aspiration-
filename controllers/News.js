const NewsModel = require("../models/NewsModel");
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

class News {
  // Get All News Data
  static async getlistAllNews(req, res) {
    try {
      const NewsList = await NewsModel.find().populate([
        "user_id",
        "category_id",
        "comments",
      ]);
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get All News",
          time: Timestamp,
        },
          data: {
            News : NewsList
          }
      });
    } catch (err) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All News",
          time: Timestamp,
        },
          data: {
            News : err
          }
      });
    }
  }

  // Get News by id
  static async getNewsById(req, res) {
    try {
      const id = req.params.id;
      const NewsList = await NewsModel.findOne({
        _id: id,
      });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get News by Id",
          time: Timestamp,
        },
          data: {
            News : NewsList
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get News by Id",
          time: Timestamp,
        },
          data: {
            News : error
          }
      });
    }
  }

  //   Get News By Category Name
  static async getNewsByCategory(req, res) {
    try {
      const categoryName = req.params.category_name;
      const NewsList = await NewsModel.find({
        category_name: categoryName,
      });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get News by Category",
          time: Timestamp,
        },
          data: {
            News : NewsList
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get News by Category",
          time: Timestamp,
        },
          data: {
            News : error
          }
      });
    }
  }

  // Create new News
  static async createNews(req, res) {
    try {
      const body = req.body;
      const newsUserid = body.user_id;
      const newsCategoryID = body.category_id;
      const newsTitle = body.news_title;
      const newsAuthor = body.news_author;
      const newsThumbnail = body.news_thumbnail;
      const newsImage = body.news_image;
      const newDesc = body.news_description;
      const newsComment = body.comments;
      const newsSource = body.news_source;

      const News = new NewsModel({
        user_id: newsUserid,
        category_id: newsCategoryID,
        news_title: newsTitle,
        news_author: newsAuthor,
        news_thumbnail: newsThumbnail,
        news_image: newsImage,
        comments: newsComment,
        news_description: newDesc,
        news_source: newsSource,
      });
      const saved = await News.save();
      res.status(201).send({
        meta: {
          status: "Success",
          message: "Post News",
          time: Timestamp,
        },
          data: {
            News : saved
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Post News",
          time: Timestamp,
        },
          data: {
            News : error
          }
      });
    }
  }
  // TODO : Update News Masih Belum Bisa
  //   Update News
  static async updateNews(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      const updated = await NewsModel.findOneAndUpdate(
        { _id: id },
        body,
        { new: true },
      );
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Update News",
          time: Timestamp,
        },
          data: {
            News : updated
          }
      });

    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Success",
          message: "Update News",
          time: Timestamp,
        },
          data: {
            News : error
          }
      });
    }
  }

  // Delete News

  static async deleteNews(req, res) {
    try {
      const id = req.params.id;
      await NewsModel.deleteOne({ _id: id });
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Delete News",
          time: Timestamp,
        },
          data: {
            News : `${id} has been deleted `
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Delete News",
          time: Timestamp,
        },
          data: {
            News : error
          }
      });
    }
  }
}

module.exports = News;
