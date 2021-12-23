const express = require("express");
// const body = require("express-validator");

const NewsController = require("../controllers/News");

const router = express.Router();

router.get("/", NewsController.getlistAllNews);
router.post("/", NewsController.createNews);
router.get("/:id", NewsController.getNewsById);
router.get("/:category_name", NewsController.getNewsByCategory);
router.put('/:id',NewsController.updateNews);
router.delete('/:id',NewsController.deleteNews);


module.exports = router
