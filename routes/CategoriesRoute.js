const express = require("express")

const authorize = require("../middleware/auth");
const CategoriesController = require('../controllers/CategoriesController');

// creates a new router instance.
const router = express.Router()

// API User Group Endpoints
router
  .route('/')
  .get(CategoriesController.listAllCategory)
  .post(authorize, CategoriesController.createNewCategory);

router
  .route('/:id')
  .get(authorize, CategoriesController.readCategory)
  .put(authorize, CategoriesController.updateCategory)
  .delete(authorize, CategoriesController.deleteCategory);

module.exports = router