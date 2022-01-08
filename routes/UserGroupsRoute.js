const express = require("express")

const authorize = require("../middleware/auth");
const UserGroups = require('../controllers/UserGroupsController');

// creates a new router instance.
const router = express.Router()

// API User Group Endpoints
router
  .route('/')
  .get(UserGroups.listAllUserGroups)
  .post(UserGroups.createNewUserGroup);

router
  .route('/:usergroupid')
  .get(UserGroups.readUserGroup)
  .put(authorize, UserGroups.updateUserGroup)
  .delete(authorize, UserGroups.deleteUserGroup);

module.exports = router