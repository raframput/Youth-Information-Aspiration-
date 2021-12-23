const express = require("express");

const CommentController = require("../controllers/Comments");

const router = express.Router();

router.get("/", CommentController.getlistAllComment);
router.post("/", CommentController.createComment);
router.get("/:id", CommentController.getCommentById);
// todo masih belum bisa GET BY NEWS_ID
router.get("/:news_id", CommentController.getCommentByNews);
router.put("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.deleteComment);

module.exports = router
