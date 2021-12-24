const express = require("express");
const bodyParser = require('body-parser')

// creates a new router instance.
const router = express.Router();

const userRoutes = require("./users");
const user_groupRoutes = require("./user_groups");
const categoriesRoutes = require("./categories");
const aspirationRoutes = require("./aspirations");
const discussionRoutes = require("./discussions");
const newsRoutes = require("./news_router");
const commentRoutes = require("./comment_route");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/ping", (req, res) => {
  const ready = {
    status: "server is ready",
  };

  res.status(200).send(ready);
});

router.use("/users", userRoutes)
router.use("/user-groups", user_groupRoutes)
router.use("/categories", categoriesRoutes)
router.use("/news", newsRoutes)
router.use("/comments", commentRoutes)
router.use("/aspirations", aspirationRoutes)
router.use("/discussions", discussionRoutes)

module.exports = router;
