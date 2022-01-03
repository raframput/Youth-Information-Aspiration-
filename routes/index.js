const express = require("express");
const bodyParser = require('body-parser')
const http = require("http");
const path = require("path");
const fs = require("fs");

// creates a new router instance.
const router = express.Router();

const userRoutes = require("./UsersRoute");
const usergroupRoutes = require("./UserGroupsRoute");
const categoriesRoutes = require("./CategoriesRoute");
const aspirationRoutes = require("./AspirationsRoute");
const discussionRoutes = require("./DiscussionsRoute");
const newsRoutes = require("./NewsRoute");
const commentRoutes = require("./CommentsRoute");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/image.png", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/logo/assassinscode.png"));
});

router.get("/", (req, res) => {
  let ready =  `<div class="" align="center">
  <h1>Welcome to Our Final Development Project</h1>
    <br>
    <h2>by Assassin's Code Teams</h2>
    <br>
    <img src="/image.png">
  </div>
    `
  

  res.status(200).send(ready);
});

router.use("/users", userRoutes)
router.use("/user-groups", usergroupRoutes)

router.use("/categories", categoriesRoutes)

router.use("/news", newsRoutes)
router.use("/comments", commentRoutes)

router.use("/aspirations", aspirationRoutes)
router.use("/discussions", discussionRoutes)

module.exports = router;