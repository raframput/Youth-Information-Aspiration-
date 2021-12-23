const express = require("express")
const bodyParser = require('body-parser');
const userRoutes = require("./users")
const user_groupRoutes = require("./user_groups")

// creates a new router instance.
const router = express.Router();

const aspirationRoutes = require("./aspirations");
const discussionRoutes = require("./discussions");
const NewsRoute = require("./news_router");
const CommentRoute = require("./comment_route");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/ping", (req, res) => {
  const ready = {
    status: "server is ready",
  };

  res.status(200).send(ready);
});

// News + Comment
router.use('/news',NewsRoute);
router.use('/comment',CommentRoute);

router.use("/users", userRoutes)
router.use("/user-groups", user_groupRoutes)

module.exports = router;
