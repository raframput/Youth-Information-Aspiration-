//Import Model UserModel
const User = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorize = require("../middleware/auth");
const {Timestamp} = require('../helpers/timestamphelper');

class UserAPI {

  // Login
  static async loginUser(req, res){
    let getUser;
    await User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser
        });

        res.cookie('jwtToken', jwtToken,{
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        })
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
  }

  // Baca semua data
  static async listAllUsers(req, res) {
    await User.find({}, (err, User) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get All User",
          time: Timestamp,
        },
          data: {
            User : err
          }
      });
      }
      res.status(200).send({
        meta: {
          status: "Success",
          message: "Get All User",
          time: Timestamp,
        },
          data: {
            User : User
          }
      });
    }).populate('user_group');
  };

  // Tambah data dengan validasi
  static async createNewUser(req, res) {
    const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        user_group: req.body.user_group,  
        image: req.file.path,
        country: req.body.country,
        organization: req.body.organization,
    });

    await newUser.save((err, newUser) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Post User",
          time: Timestamp,
        },
          data: {
            User : err
          }
      });
      }
      res.status(201).json({
        meta: {
          status: "Success",
          message: "Post User",
          time: Timestamp,
        },
          data: {
            User : newUser
          }
      });
    });

  };

  // Baca data berdasarkan id
  static async readUser(req, res) {
    await User.findById(req.params.userid, (err, User) => {
      if (err) {
        res.status(500).send({
        meta: {
          status: "Error",
          message: "Get User by Id",
          time: Timestamp,
        },
          data: {
            User : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Get User by Id",
          time: Timestamp,
        },
          data: {
            User : User
          }
      });
    });
  };

  // Ubah data berdasarkan id
  static async updateUser(req, res) {
    await User.findOneAndUpdate(
      { _id: req.params.userid },
      req.body,
      { new: true },
      (err, User) => {
        if (err) {
          res.status(500).send({
        meta: {
          status: "Error",
          message: "Updated User",
          time: Timestamp,
        },
          data: {
            User : err
          }
      });
        }
        res.status(200).json({
        meta: {
          status: "Success",
          message: "Updated User",
          time: Timestamp,
        },
          data: {
            User : User
          }
      });
      }
    );
  };

  // Hapus data berdasarkan id
  static async deleteUser(req, res) {
    await User.findByIdAndRemove({ _id: req.params.userid }, (err, User) => {
      if (err) {
        res.status(404).send({
        meta: {
          status: "Error",
          message: "Delete User",
          time: Timestamp,
        },
          data: {
            User : err
          }
      });
      }
      res.status(200).json({
        meta: {
          status: "Success",
          message: "Delete User",
          time: Timestamp,
        },
          data: {
            User : User
          }
      });
    });
  };
}

module.exports = UserAPI