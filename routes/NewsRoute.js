'use strict';
const express = require("express");

const authorize = require("../middleware/auth");
const NewsController = require("../controllers/NewsController");
const {upload} = require('../helpers/filehelper');

const router = express.Router();

router.get("/", NewsController.getlistAllNews);
router.post("/", upload.single("news_thumbnail"), NewsController.createNews);
router.get("/:id", NewsController.getNewsById);
router.get("/category/:category_id", NewsController.getNewsByCategory);
router.get("/title/:news_title", NewsController.getNewsByTitle);
router.get("/limit/:limit", NewsController.getNewsLimit);
router.put('/:id', authorize, NewsController.updateNews);
router.delete('/:id', authorize, NewsController.deleteNews);

module.exports = router