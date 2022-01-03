const express = require("express");

const authorize = require("../middleware/auth");
const NewsController = require("../controllers/NewsController");

const router = express.Router();

router.get("/", NewsController.getlistAllNews);
router.post("/", authorize, NewsController.createNews);
router.get("/:id", NewsController.getNewsById);
router.get("/:category_name", authorize, NewsController.getNewsByCategory);
router.put('/:id', authorize, NewsController.updateNews);
router.delete('/:id', authorize, NewsController.deleteNews);


module.exports = router