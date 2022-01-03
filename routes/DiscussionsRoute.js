const express = require("express");
const { body } = require("express-validator");

const authorize = require("../middleware/auth");
const DiscussionsController = require("../controllers/DiscussionsController");

// creates a new router instance.
const router = express.Router();

router.post(
  "/",
  [body("discussion_description").isLength({ min: 5 })],
  authorize, DiscussionsController.createNewDiscussion
);
router.get("/", authorize, DiscussionsController.getAllDiscussion);
router.get("/:id", authorize, DiscussionsController.getDiscussionByID);
router.put("/:id", authorize, DiscussionsController.updateDiscussion);
router.delete("/:id", authorize, DiscussionsController.deleteDiscussion);

module.exports = router;