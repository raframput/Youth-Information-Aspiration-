const NewsModel = require("../models/NewsModel");
const Configuration = require('../models/ConfigurationsModel');
const {Timestamp} = require('../helpers/timestamphelper');

class News {
  // Get All News Data
  static async getlistAllNews(req, res) {
    try {
      const NewsList = await NewsModel.find().populate([
        "user_id",
        "category_id",
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
      }).populate([
        "user_id",
        "category_id",
      ]);
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
      const category_name = req.params.category_name;
      const NewsList = await NewsModel.findOne({
        category_name: category_name,
      }).populate([
        "user_id",
        "category_id",
      ]);
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


//   Get News By Title Name
  static async getNewsByTitle(req, res) {
    try {
      const titleName = req.params.news_title;
      const NewsList = await NewsModel.findOne({
        news_title: titleName,
      }).populate([
        "user_id",
        "category_id",
      ]);
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get News by Title",
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
          message: "Get News by Title",
          time: Timestamp,
        },
          data: {
            News : error
          }
      });
    }
  }

  //   Get News Limit
  static async getNewsLimit(req, res) {
    try {
      const limit = req.params.limit;
      const NewsList = await NewsModel.find().limit(limit).populate([
        "user_id",
        "category_id",
      ]);
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get News Limit",
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
          message: "Get News by Limit",
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
      const newsThumbnail = req.file.path;
      const newsImage = body.news_image;
      const newsVideo = body.news_video;
      const newDesc = body.news_description;
      const newsSource = body.news_source;
      const newsHit = body.news_hit;
      const newsStatus = body.news_status;

      const News = new NewsModel({
        user_id: newsUserid,
        category_id: newsCategoryID,
        news_title: newsTitle,
        news_author: newsAuthor,
        news_thumbnail: newsThumbnail,
        news_image: newsImage,
        news_video: newsVideo,
        news_description: newDesc,
        news_source: newsSource,
        news_hit: newsHit,
        news_status: newsStatus,
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