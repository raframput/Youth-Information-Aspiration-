const express = require("express");
const { body } = require("express-validator");

const authorize = require("../middleware/auth");
const AspirationController = require("../controllers/Aspirations");
// const artiscontrollerinstance = new ArtisController();

// creates a new router instance.
const router = express.Router();

router.post(
  "/",
  [body("aspiration_description").isLength({ min: 5 })],
  authorize, AspirationController.createNewAspiration
);
router.get("/", authorize, AspirationController.getAllAspiration);
router.post("/:id", authorize, AspirationController.createNewAspirationByUserId);
router.get("/:id", authorize, AspirationController.getAspirationByUserID);
// router.put("/:id", authorize, AspirationController.updateAspiration);
router.delete("/:id", authorize, AspirationController.deleteAspiration);

module.exports = router;
