// Import Model base UserGroup
const UserGroup = require('../models/UserGroupModel');

// List all available UserGroups
exports.listAllUserGroups = (req, res) => {
  UserGroup.find({}, (err, UserGroup) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(UserGroup);
  });
};

// Create a new UserGroup with required validation
exports.createNewUserGroup = (req, res) => {
  let newUserGroup = new UserGroup(req.body);
  newUserGroup.save((err, UserGroup) => {
    if (err) {
      res.status(500).send({ message: 'Please fill all the fields' });
    }
    res.status(201).json(UserGroup);
  });
};

// Get or read a perticular UserGroup => By id
exports.readUserGroup = (req, res) => {
  UserGroup.findById(req.params.usergroupid, (err, UserGroup) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(UserGroup);
  });
};

// Update a new UserGroup => By id
exports.updateUserGroup = (req, res) => {
  UserGroup.findOneAndUpdate(
    { _id: req.params.usergroupid },
    req.body,
    { new: true },
    (err, UserGroup) => {
      if (err) {
        res.status(500).send(err);
      }
      //   res.status(200).json(UserGroup);
      res.status(200).json({ message: 'UserGroup successfully Updated' });
    }
  );
};

// Delete a perticular UserGroup => By id
exports.deleteUserGroup = (req, body) => {
  UserGroup.remove({ _id: req.params.usergroupid }, (err, UserGroup) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: 'UserGroup successfully deleted' });
  });
};
