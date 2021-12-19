const Aspirations = require("../controllers/Aspirations");
const Categories = require("../controllers/Categories");
const Comments = require("../controllers/Comments");
const Discussions = require("../controllers/Discussions");
const News = require("../controllers/News");
const UserGroups = require("../controllers/UserGroups");
const Users = require("../controllers/Users");

const VerifyToken = require("../middleware/VerifyToken");
const adminAspiration = require("../controllers/AdminAspiration");
const adminCategory = require("../controllers/AdminCategory");

const express = require("express");
const bodyParser = require("body-parser");

// creates a new router instance.
const router = express.Router();

const aspirationRoutes = require("./aspirations");
const discussionRoutes = require("./discussions");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/ping", (req, res) => {
  const ready = {
    status: "server is ready",
  };

  res.status(200).send(ready);
});

// API Category Endpoints
router
  .route("/categories")
  .get(Categories.listAllCategorys)
  .post(Categories.createNewCategory);

router
  .route("/categories/:categoryid")
  .get(Categories.readCategory)
  .put(Categories.updateCategory)
  .delete(Categories.deleteCategory);

// API User Group Endpoints
router
  .route("/user-groups")
  .get(UserGroups.listAllUserGroups)
  .post(UserGroups.createNewUserGroup);

router
  .route("/user-groups/:usergroupid")
  .get(UserGroups.readUserGroup)
  .put(UserGroups.updateUserGroup)
  .delete(UserGroups.deleteUserGroup);

// API User Endpoints
router.route("/users").get(Users.listAllUsers).post(Users.createNewUser);

router
  .route("/users/:userid")
  .get(Users.readUser)
  .put(Users.updateUser)
  .delete(Users.deleteUser);

// Admin Aspiration Endpoinst
router
  .route("/admin-aspiration")
  .get(adminAspiration.getAllAdminAspiration)
  .post(adminAspiration.create);

router
  .route("/admin-aspiration/adminaspiration:id")
  .get(adminAspiration.getOne)
  .put(adminAspiration.update)
  .delete(adminAspiration.delete);

// Admin Category Endpoinst
router
  .route("/admin-category")
  .get(adminCategory.getAllAdminCategory)
  .post(adminCategory.create);

router
  .route("/admin-category/admincategory:id")
  .get(adminCategory.getOne)
  .put(adminCategory.update)
  .delete(adminCategory.delete);

module.exports = router;
