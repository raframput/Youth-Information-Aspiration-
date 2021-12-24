// Import Model CategoryModel
const Category = require('../models/CategoryModel');
const { body, validationResult } = require('express-validator');

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

class CategoriesAPI {
  // Baca semua data
  static async listAllCategory(req, res) {
    Category.find({}, (err, Category) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Category",
          time: Timestamp,
        },
          data: {
            Category : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get All Category",
          time: Timestamp,
        },
          data: {
            Category : Category
          }
      });
    });
  };

  // Tambah data dengan validasi
  static async createNewCategory(req, res) {
    let newCategory = new Category(req.body);
    newCategory.save((err, Category) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Category",
          time: Timestamp,
        },
          data: {
            Category : err
          }
      });
      }
      res.status(201).json({
        meta: {
          status: "Success",
          message: "Post Category",
          time: Timestamp,
        },
          data: {
            Category : newCategory
          }
      });
    });
  };

  // Baca data berdasarkan id
  static async readCategory(req, res) {
    Category.findById(req.params.id, (err, Category) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Category by Id",
          time: Timestamp,
        },
          data: {
            Category : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get Category by Id",
          time: Timestamp,
        },
          data: {
            Category : Category
          }
      });
    });
  };

  // Ubah data berdasarkan id
  static async updateCategory(req, res) {
    Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, Category) => {
        if (err) {
          res.status(500).send({
          meta: {
            status: "Error",
            message: "Updated Category",
            time: Timestamp,
          },
            data: {
              Category : err
            }
        });
        }
        res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated Category",
          time: Timestamp,
        },
          data: {
            Category : Category
          }
      });
      }
    );
  };

  // Hapus data berdasarkan id
  static async deleteCategory(req, body) {
    Category.remove({ _id: req.params.id }, (err, Category) => {
      if (err) {
        res.status(404).send({
        meta: {
          status: "Error",
          message: "Delete Category",
          time: Timestamp,
        },
          data: {
            Category : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Delete Category",
          time: Timestamp,
        },
          data: {
            Category : Category
          }
      });
    });
  };
}

module.exports = CategoriesAPI

