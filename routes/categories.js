const express = require("express")

const authorize = require("../middleware/auth");
const Categories = require('../controllers/Categories');

// creates a new router instance.
const router = express.Router()

// API User Group Endpoints
router
  .route('/')
  .get(authorize, Categories.listAllCategory)
  .post(authorize, Categories.createNewCategory);

router
  .route('/:id')
  .get(authorize, Categories.readCategory)
  .put(authorize, Categories.updateCategory)
  .delete(authorize, Categories.deleteCategory);

module.exports = router