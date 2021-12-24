const express = require("express");
// const body = require("express-validator");

const authorize = require("../middleware/auth");
const NewsController = require("../controllers/News");

const router = express.Router();

router.get("/", authorize, NewsController.getlistAllNews);
router.post("/", authorize, NewsController.createNews);
router.get("/:id", authorize, NewsController.getNewsById);
router.get("/:category_name", authorize, NewsController.getNewsByCategory);
router.put('/:id', authorize, NewsController.updateNews);
router.delete('/:id', authorize, NewsController.deleteNews);


module.exports = router
