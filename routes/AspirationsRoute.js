const express = require("express");
const { body } = require("express-validator");

const authorize = require("../middleware/auth");
const AspirationsController = require("../controllers/AspirationsController");

// creates a new router instance.
const router = express.Router();

router.post(
  "/",
  [body("aspiration_description").isLength({ min: 5 })],
  authorize, AspirationsController.createNewAspiration
);
router.get("/", AspirationsController.getAllAspiration);
router.post("/:id", authorize, AspirationsController.createNewAspirationByUserId);
router.get("/:id", AspirationsController.getAspirationByUserID);
// router.put("/:id", authorize, AspirationsController.updateAspiration);
router.delete("/:id", authorize, AspirationsController.deleteAspiration);

module.exports = router;