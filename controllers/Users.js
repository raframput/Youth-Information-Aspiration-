// Import Model UserModel
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = (req, res) => {

};

exports.Logout = (req, res) => {

};

// Baca semua data
exports.listAllUsers = (req, res) => {
  User.find({}, (err, User) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(User);
  });
};

// Tambah data dengan validasi
exports.createNewUser = (req, res) => {
  const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      user_group: req.body.user_group,  
  });

  newUser.save((err, newUser) => {
    if (err) {
      res.status(500).send({ message: 'Please fill all the fields' });
    }
    res.status(201).json(newUser);
  });

};

// Baca data berdasarkan id
exports.readUser = (req, res) => {
  User.findById(req.params.userid, (err, User) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(User);
  });
};

// Ubah data berdasarkan id
exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userid },
    req.body,
    { new: true },
    (err, User) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: 'User successfully Updated' });
    }
  );
};

// Hapus data berdasarkan id
exports.deleteUser = (req, body) => {
  User.remove({ _id: req.params.userid }, (err, User) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: 'User successfully deleted' });
  });
};
