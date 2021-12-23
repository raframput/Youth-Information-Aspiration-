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

module.exports = router;
