// Import Model CategoryModel
const Category = require('../models/CategoriesModel');
const {Timestamp} = require('../helpers/timestamphelper');

class CategoriesAPI {
  // Baca semua data
  static async listAllCategory(req, res) {
    await Category.find({}, (err, Category) => {
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
    await newCategory.save((err, Category) => {
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
    await Category.findById(req.params.id, (err, Category) => {
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
    await Category.findOneAndUpdate(
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
  static async deleteCategory(req, res) {
    await Category.remove({ _id: req.params.id }, (err, Category) => {
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