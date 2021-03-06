const AspirationsModel = require("../models/AspirationsModel");
const UsersModel = require("../models/UsersModel");
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

class Aspirations {
  static async createNewAspiration(req, res) {
    try {
      AspirationsModel.create({
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        aspiration_title: req.body.aspiration_title, 
        // aspiration_image: req.file.path,
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

  static async updateAspiration(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      await AspirationsModel.findOneAndUpdate({ _id: id },
        {
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        aspiration_title: req.body.aspiration_title, 
        aspiration_image: req.file.path,
        aspiration_source: req.body.aspiration_source,
        aspiration_description: req.body.aspiration_description,
    },{ new: true });
      res.status(200).send({
            meta: {
              status: "Success",
              message: "Update Aspiration",
              time: Timestamp,
            },
              data: {
                Aspiration : `${id} has been Updated`
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
      AspirationsModel.find({ category_id: req.params.category_id })
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
      AspirationsModel.find({ aspiration_title: req.params.aspiration_title })
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
              message: "Delete Aspiration",
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
              message: "Delete Aspiration",
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