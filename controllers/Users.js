// Import Model UserModel
const User = require('../models/UserModel');

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
  let newUser = new User(req.body);
  newUser.save((err, User) => {
    if (err) {
      res.status(500).send({ message: 'Please fill all the fields' });
    }
    res.status(201).json(User);
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
