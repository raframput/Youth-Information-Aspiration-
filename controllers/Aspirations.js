const AspirationModel = require("../models/AspirationModel");
const { validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");

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
      AspirationModel.create(req.body).then(function (dbAspiration) {
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
      UserModel.create(req.body)
        .then(function (dbUser) {
          return AspirationModel.findOneAndUpdate(
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
      const aspirationList = await AspirationModel.find().populate([
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
      AspirationModel.findOne({ _id: req.params.id })
        .populate("user_id")
        .then(function (dbAspiration) {
          res.json({
        meta: {
          status: "Success",
          message: "Get Aspiration by Id",
          time: Timestamp,
        },
          data: {
            Aspiration : aspirationList
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

  static async deleteAspiration(req, res) {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;
      await AspirationModel.deleteOne({ _id: id });
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
