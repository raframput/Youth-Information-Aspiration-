const express = require("express");

const authorize = require("../middleware/auth");
const CommentController = require("../controllers/Comments");

const router = express.Router();

router.get("/", authorize, CommentController.getlistAllComment);
router.post("/", authorize, CommentController.createComment);
router.get("/:id", authorize, CommentController.getCommentById);
// todo masih belum bisa GET BY NEWS_ID
router.get("/:news_id", authorize, CommentController.getCommentByNews);
router.put("/:id", authorize, CommentController.updateComment);
router.delete("/:id", authorize, CommentController.deleteComment);

module.exports = router
