const express = require("express")

const authorize = require("../middleware/auth");
const ConfigurationsController = require('../controllers/ConfigurationsController');

// creates a new router instance.
const router = express.Router()

// API User Group Endpoints
router
  .route('/')
  .get(ConfigurationsController.listAllConfiguration)
  .post(ConfigurationsController.createNewConfiguration);

router
  .route('/:id')
  .get(authorize, ConfigurationsController.readConfiguration)
  .put(authorize, ConfigurationsController.updateConfiguration)
  .delete(authorize, ConfigurationsController.deleteConfiguration);

module.exports = router