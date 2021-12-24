const express = require("express");
const { body } = require("express-validator");

const authorize = require("../middleware/auth");
const DiscussionController = require("../controllers/Discussions");

// creates a new router instance.
const router = express.Router();

router.post(
  "/",
  [body("discussion_description").isLength({ min: 5 })],
  authorize, DiscussionController.createNewDiscussion
);
router.get("/", authorize, DiscussionController.getAllDiscussion);
router.get("/:id", authorize, DiscussionController.getDiscussionByID);
router.put("/:id", authorize, DiscussionController.updateDiscussion);
router.delete("/:id", authorize, DiscussionController.deleteDiscussion);

module.exports = router;
