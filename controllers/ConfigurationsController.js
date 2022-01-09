// Import Model ConfigurationModel
const Configuration = require('../models/ConfigurationsModel');

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

class ConfigurationAPI {
  // Baca semua data
  static async listAllConfiguration(req, res) {
    await Configuration.find({}, (err, Configuration) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All Configuration",
          time: Timestamp,
        },
          data: {
            Configuration : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get All Configuration",
          time: Timestamp,
        },
          data: {
            Configuration : Configuration
          }
      });
    });
  };

  // Tambah data dengan validasi
  static async createNewConfiguration(req, res) {
    let newConfiguration = new Configuration(req.body);
    await newConfiguration.save((err, Configuration) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Post Configuration",
          time: Timestamp,
        },
          data: {
            Configuration : err
          }
      });
      }
      res.status(201).json({
        meta: {
          status: "Success",
          message: "Post Configuration",
          time: Timestamp,
        },
          data: {
            Configuration : newConfiguration
          }
      });
    });
  };

  // Baca data berdasarkan id
  static async readConfiguration(req, res) {
    await Configuration.findById(req.params.id, (err, Configuration) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get Configuration by Id",
          time: Timestamp,
        },
          data: {
            Configuration : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get Configuration by Id",
          time: Timestamp,
        },
          data: {
            Configuration : Configuration
          }
      });
    });
  };

  // Ubah data berdasarkan id
  static async updateConfiguration(req, res) {
    await Configuration.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, Configuration) => {
        if (err) {
          res.status(500).send({
          meta: {
            status: "Error",
            message: "Updated Configuration",
            time: Timestamp,
          },
            data: {
              Configuration : err
            }
        });
        }
        res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated Configuration",
          time: Timestamp,
        },
          data: {
            Configuration : Configuration
          }
      });
      }
    );
  };

  // Hapus data berdasarkan id
  static async deleteConfiguration(req, res) {
    await Configuration.remove({ _id: req.params.id }, (err, Configuration) => {
      if (err) {
        res.status(404).send({
        meta: {
          status: "Error",
          message: "Delete Configuration",
          time: Timestamp,
        },
          data: {
            Configuration : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Delete Configuration",
          time: Timestamp,
        },
          data: {
            Configuration : Configuration
          }
      });
    });
  };
}

module.exports = ConfigurationAPI