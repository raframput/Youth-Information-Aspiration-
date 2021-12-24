// Import Model UserGroupModel
const UserGroup = require('../models/UserGroupModel');

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

class UserGroupAPI {

  // Baca semua data
  static async listAllUserGroups(req, res) {
    UserGroup.find({}, (err, UserGroup) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get All UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : UserGroup
          }
      });
    });
  };

  // Tambah data dengan validasi
  static async createNewUserGroup(req, res) {
    let newUserGroup = new UserGroup(req.body);
    newUserGroup.save((err, UserGroup) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Post UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : err
          }
      });
      }
      res.status(201).json({
        meta: {
          status: "Success",
          message: "Post UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : newUserGroup
          }
      });
    });
  };

  // Baca data berdasarkan id
  static async readUserGroup(req, res) {
    UserGroup.findById(req.params.usergroupid, (err, UserGroup) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get UserGroup by Id",
          time: Timestamp,
        },
          data: {
            UserGroup : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get UserGroup by Id",
          time: Timestamp,
        },
          data: {
            UserGroup : UserGroup
          }
      });
    });
  };

  // Ubah data berdasarkan id
  static async updateUserGroup(req, res) {
    UserGroup.findOneAndUpdate(
      { _id: req.params.usergroupid },
      req.body,
      { new: true },
      (err, UserGroup) => {
        if (err) {
          res.status(500).send({
        meta: {
          status: "Error",
          message: "Updated UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : err
          }
      });
        }
        res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : UserGroup
          }
      });
      }
    );
  };

  // Hapus data berdasarkan id
  static async deleteUserGroup(req, res) {
    UserGroup.findByIdAndRemove({ _id: req.params.usergroupid }, (err, UserGroup) => {
      if (err) {
        res.status(404).send({
        meta: {
          status: "Error",
          message: "Delete UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Delete UserGroup",
          time: Timestamp,
        },
          data: {
            UserGroup : UserGroup
          }
      });
    });
  };
}

module.exports = UserGroupAPI
