// Import Model UserModel
const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorize = require("../middleware/auth");
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

class UserAPI {

  // Login
  static async loginUser(req, res){
    let getUser;
    User.findOne({
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
    User.find({}, (err, User) => {
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
    body('name').trim()
    body('email').isEmail()
    body('password').isLength({ min: 8 })
    body('user_group').trim()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        user_group: req.body.user_group,  
    });

    newUser.save((err, newUser) => {
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
    User.findById(req.params.userid, (err, User) => {
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
    User.findOneAndUpdate(
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
    User.findByIdAndRemove({ _id: req.params.userid }, (err, User) => {
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