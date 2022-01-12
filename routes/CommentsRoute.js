const express = require("express");

const authorize = require("../middleware/auth");
const CommentsController = require("../controllers/CommentsController");

const router = express.Router();

router.get("/", CommentsController.getlistAllComment);
router.post("/", authorize, CommentsController.createComment);
router.get("/:id", CommentsController.getCommentById);
router.get("/news/:news_id", CommentsController.getCommentByNews);
router.put("/:id", authorize, CommentsController.updateComment);
router.delete("/:id", authorize, CommentsController.deleteComment);

module.exports = router