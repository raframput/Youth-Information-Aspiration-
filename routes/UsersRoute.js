const express = require("express")

const authorize = require("../middleware/auth");
const Users = require('../controllers/UsersController');
const {upload} = require('../helpers/filehelper');

// creates a new router instance.
const router = express.Router()

// API User Endpoints
router.post('/login', Users.loginUser);

router
  .route('/register')
  .post(Users.createNewUser);

router
  .route('/')
  .get(authorize, Users.listAllUsers)

router
  .route('/:userid')
  .get(authorize, Users.readUser)
  .put(upload.single("image"), Users.updateUser)
  .delete(authorize, Users.deleteUser);

module.exports = router