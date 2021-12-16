const Aspirations = require('../controllers/Aspirations');
const Categories = require('../controllers/Categories');
const Comments = require('../controllers/Comments');
const Discussions = require('../controllers/Discussions');
const News = require('../controllers/News');
const UserGroups = require('../controllers/UserGroups');
const Users = require('../controllers/Users');

const VerifyToken = require('../middleware/VerifyToken');


const express = require("express")
const bodyParser = require('body-parser');

// creates a new router instance.
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/ping", (req, res) => {
    const ready = {
        status: "server is ready"
    }

    res.status(200).send(ready)
})

// API Category Endpoints
router
  .route('/categories')
  .get(Categories.listAllCategorys)
  .post(Categories.createNewCategory);

router
  .route('/categories/:categoryid')
  .get(Categories.readCategory)
  .put(Categories.updateCategory)
  .delete(Categories.deleteCategory);

// API User Group Endpoints
router
  .route('/user-groups')
  .get(UserGroups.listAllUserGroups)
  .post(UserGroups.createNewUserGroup);

router
  .route('/user-groups/:usergroupid')
  .get(UserGroups.readUserGroup)
  .put(UserGroups.updateUserGroup)
  .delete(UserGroups.deleteUserGroup);

// API User Endpoints
router
  .route('/users')
  .get(Users.listAllUsers)
  .post(Users.createNewUser);

router
  .route('/users/:userid')
  .get(Users.readUser)
  .put(Users.updateUser)
  .delete(Users.deleteUser);


module.exports = router