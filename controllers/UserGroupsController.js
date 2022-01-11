// Import Model UserGroupModel
const UserGroup = require('../models/UserGroupsModel');
const {Timestamp} = require('../helpers/timestamphelper');

class UserGroupAPI {

  // Baca semua data
  static async listAllUserGroups(req, res) {
    await UserGroup.find({}, (err, UserGroup) => {
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
    await newUserGroup.save((err, UserGroup) => {
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
    await UserGroup.findById(req.params.usergroupid, (err, UserGroup) => {
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
    await UserGroup.findOneAndUpdate(
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
    await UserGroup.findByIdAndRemove({ _id: req.params.usergroupid }, (err, UserGroup) => {
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