const AspirationsModel = require("../models/AspirationsModel");
const UsersModel = require("../models/UsersModel");
const {Timestamp} = require('../helpers/timestamphelper');

class Aspirations {
  static async createNewAspiration(req, res) {
    try {
      AspirationsModel.create({
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        aspiration_title: req.body.aspiration_title, 
        aspiration_image: req.file.path,
        aspiration_source: req.body.aspiration_source,
        aspiration_description: req.body.aspiration_description,
    }).then(function (dbAspiration) {
        res.json({
        meta: {
          status: "Success",
          message: "Post Aspiration",
          time: Timestamp,
        },
          data: {
            Aspiration : dbAspiration
          }
      });
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Aspiration",
          time: Timestamp,
        },
          data: {
            Aspiration : error
          }
      });
    }
  }

  static async createNewAspirationByUserId(req, res) {
    try {
      UsersModel.create(req.body)
        .then(function (dbUser) {
          return AspirationsModel.findOneAndUpdate(
            { _id: req.params.id },
            { user_id: dbUser._id },
            { new: true }
          );
        })
        .then(function (dbAspiration) {
          res.json({
            meta: {
              status: "Success",
              message: "Update Aspiration",
              time: Timestamp,
            },
              data: {
                Aspiration : dbAspiration
              }
          });
        });
    } catch (error) {
      res.json({
            meta: {
              status: "Error",
              message: "Update Aspiration",
              time: Timestamp,
            },
              data: {
                Aspiration : error
              }
          });
    }
  }

  static async getAllAspiration(req, res) {
    try {
      const aspirationList = await AspirationsModel.find().populate([
        "user_id",
        "category_id",
      ]);
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get All Aspiration",
          time: Timestamp,
        },
          data: {
            Aspiration : aspirationList
          }
      });
    } catch (error) {
      res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Aspiration",
          time: Timestamp,
        },
          data: {
            Aspiration : error
          }
      });
    }
  }

  static async getAspirationByUserID(req, res) {
    try {
      AspirationsModel.findOne({ _id: req.params.id })
        .populate([
          "user_id",
          "category_id",
        ])
        .then(function (dbAspiration) {
          res.json({
        meta: {
          status: "Success",
          message: "Get Aspiration by Id",
          time: Timestamp,
        },
          data: {
            Aspiration : dbAspiration
          }
      });
        });
    } catch (error) {
      res.json({
        meta: {
          status: "Error",
          message: "Get Aspiration by Id",
          time: Timestamp,
        },
          data: {
            Aspiration : error
          }
      });
    }
  }

  static async getAspirationByCategory(req, res) {
    try {
      AspirationsModel.findOne({ category_name: req.params.category_name })
        .populate([
          "user_id",
          "category_id",
        ])
        .then(function (dbAspiration) {
          res.json({
        meta: {
          status: "Success",
          message: "Get Aspiration by Category",
          time: Timestamp,
        },
          data: {
            Aspiration : dbAspiration
          }
      });
        });
    } catch (error) {
      res.json({
        meta: {
          status: "Error",
          message: "Get Aspiration by Category",
          time: Timestamp,
        },
          data: {
            Aspiration : error
          }
      });
    }
  }

  static async getAspirationByTitle(req, res) {
    try {
      AspirationsModel.findOne({ aspiration_title: req.params.aspiration_title })
        .populate([
          "user_id",
          "category_id",
        ])
        .then(function (dbAspiration) {
          res.json({
        meta: {
          status: "Success",
          message: "Get Aspiration by Category",
          time: Timestamp,
        },
          data: {
            Aspiration : dbAspiration
          }
      });
        });
    } catch (error) {
      res.json({
        meta: {
          status: "Error",
          message: "Get Aspiration by Category",
          time: Timestamp,
        },
          data: {
            Aspiration : error
          }
      });
    }
  }

  static async getAspirationLimit(req, res) {
    try {
      const limit = req.params.limit;
      AspirationsModel.find().limit(limit)
        .populate([
          "user_id",
          "category_id",
        ])
        .then(function (dbAspiration) {
          res.json({
        meta: {
          status: "Success",
          message: "Get Aspiration by Category",
          time: Timestamp,
        },
          data: {
            Aspiration : dbAspiration
          }
      });
        });
    } catch (error) {
      res.json({
        meta: {
          status: "Error",
          message: "Get Aspiration by Category",
          time: Timestamp,
        },
          data: {
            Aspiration : error
          }
      });
    }
  }

  static async deleteAspiration(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      await AspirationsModel.deleteOne({ _id: id });
      res.status(200).send({
            meta: {
              status: "Success",
              message: "Update Aspiration",
              time: Timestamp,
            },
              data: {
                Aspiration : `${id} has been deleted `
              }
          });
    } catch (error) {
      res.status(500).send({
            meta: {
              status: "Error",
              message: "Update Aspiration",
              time: Timestamp,
            },
              data: {
                Aspiration : error
              }
          });
    }
  }
}
module.exports = Aspirations;