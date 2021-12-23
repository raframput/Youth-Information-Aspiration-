const express = require("express")

const authorize = require("../middleware/auth");
const UserGroups = require('../controllers/UserGroups');

// creates a new router instance.
const router = express.Router()

// API User Group Endpoints
router
  .route('/')
  .get(authorize, UserGroups.listAllUserGroups)
  .post(authorize, UserGroups.createNewUserGroup);

router
  .route('/:usergroupid')
  .get(authorize, UserGroups.readUserGroup)
  .put(authorize, UserGroups.updateUserGroup)
  .delete(authorize, UserGroups.deleteUserGroup);

module.exports = router