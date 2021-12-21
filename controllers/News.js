const NewsModel = require("../models/NewsModel");
const { validationResult } = require("express-validator");

class News {
  // Get All News Data
  static async getlistAllNews(req, res) {
    try {
      const NewsList = await NewsModel.find();
      res.status(200).send(NewsList);
    } catch (err) {
      res.status(500).send({
        message: err,
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
      res.status(200).send(NewsList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  //   Get News By Category Name
  static async getNewsByCategory(req, res) {
    try {
      const categoryName = req.params.category_name;
      const NewsList = await NewsModel.find({
        category_name: categoryName,
      });
      res.status(200).send(NewsList);
    } catch (error) {
      res.status(500).send({ err: error });
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
      const newsSource = body.news_source;

      const News = new NewsModel({
        user_id: newsUserid,
        category_id: newsCategoryID,
        news_title: newsTitle,
        news_author: newsAuthor,
        news_thumbnail: newsThumbnail,
        news_image: newsImage,
        news_description: newDesc,
        news_source: newsSource,
      });
      const saved = await News.save();
      res.status(201).send({
        message: "Succes Created the Data",
        data: saved,
      });
    } catch (error) {
      res.status(500).send({ err: error.message, data: "Ini Error Bro" });
    }
  }
  // TODO : Update News Masih Belum Bisa
  //   Update News
  static async updateNews(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      const newsTitle = body.news_title;
      const newsAuthor = body.news_author;
      const newsThumbnail = body.news_thumbnail;
      const newsImage = body.news_image;
      const newDesc = body.news_description;
      const newsSource = body.news_source;

      const News = new NewsModel({
        news_title: newsTitle,
        news_author: newsAuthor,
        news_thumbnail: newsThumbnail,
        news_image: newsImage,
        news_description: newDesc,
        news_source: newsSource,
      });

      // await NewsModel.findOneAndUpdate(
        
      //   {
      //     _id: id,
      //   },
      //   News,{new:true},
      //   (err, News) => {
      //     if (err) {
      //       res.status(500).send(err);
      //     }
      //     res.status(200).json({ message: "Category successfully Updated" });
      //   }
      // );
      // res.status(200).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  }

  // Delete News

  static async deleteNews(req, res) {
    try {
      const id = req.params.id;
      await NewsModel.deleteOne({ _id: id });
      res.status(200).send({
        message: `${id} Has Been Deleted`,
      });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = News;
