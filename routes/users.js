const express = require("express")

const authorize = require("../middleware/auth");
const Users = require('../controllers/Users');

// creates a new router instance.
const router = express.Router()

// API User Endpoints
router.post('/login', Users.loginUser);

router
  .route('/')
  .get(authorize, Users.listAllUsers)
  .post(Users.createNewUser);

router
  .route('/:userid')
  .get(authorize, Users.readUser)
  .put(authorize, Users.updateUser)
  .delete(authorize, Users.deleteUser);

module.exports = router