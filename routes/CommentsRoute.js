const express = require("express");

const { catchErrors } = require("../helpers/errorHelper");
const authorize = require("../middleware/auth");
const CommentsController = require("../controllers/CommentsController");

const router = express.Router();

router.get("/", catchErrors(CommentsController.getlistAllComment));
router.post("/", authorize, catchErrors(CommentsController.createComment));
router.get("/:id", catchErrors(CommentsController.getCommentById));
router.get("/:news_id", authorize, catchErrors(CommentsController.getCommentByNews));
router.put("/:id", authorize, catchErrors(CommentsController.updateComment));
router.delete("/:id", authorize, catchErrors(CommentsController.deleteComment));

module.exports = router