const express = require("express");
const { body } = require("express-validator");

const DiscussionController = require("../controllers/Discussions");
// const artiscontrollerinstance = new ArtisController();

// creates a new router instance.
const router = express.Router();

router.post(
  "/",
  [body("discussion_description").isLength({ min: 5 })],
  DiscussionController.createNewDiscussion
);
router.get("/", DiscussionController.getAllDiscussion);
router.get("/:id", DiscussionController.getDiscussionByID);
router.put("/:id", DiscussionController.updateDiscussion);
router.delete("/:id", DiscussionController.deleteDiscussion);

module.exports = router;
