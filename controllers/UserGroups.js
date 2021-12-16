// Import Model UserGroupModel
const UserGroup = require('../models/UserGroupModel');

// Baca semua data
exports.listAllUserGroups = (req, res) => {
  UserGroup.find({}, (err, UserGroup) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(UserGroup);
  });
};

// Tambah data dengan validasi
exports.createNewUserGroup = (req, res) => {
  let newUserGroup = new UserGroup(req.body);
  newUserGroup.save((err, UserGroup) => {
    if (err) {
      res.status(500).send({ message: 'Please fill all the fields' });
    }
    res.status(201).json(UserGroup);
  });
};

// Baca data berdasarkan id
exports.readUserGroup = (req, res) => {
  UserGroup.findById(req.params.usergroupid, (err, UserGroup) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(UserGroup);
  });
};

// Ubah data berdasarkan id
exports.updateUserGroup = (req, res) => {
  UserGroup.findOneAndUpdate(
    { _id: req.params.usergroupid },
    req.body,
    { new: true },
    (err, UserGroup) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: 'UserGroup successfully Updated' });
    }
  );
};

// Hapus data berdasarkan id
exports.deleteUserGroup = (req, body) => {
  UserGroup.remove({ _id: req.params.usergroupid }, (err, UserGroup) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: 'UserGroup successfully deleted' });
  });
};
