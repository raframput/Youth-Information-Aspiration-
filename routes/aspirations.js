const express = require("express");
const { body } = require("express-validator");

const AspirationController = require("../controllers/Aspirations");
// const artiscontrollerinstance = new ArtisController();

// creates a new router instance.
const router = express.Router();

router.post(
  "/",
  [body("aspiration_description").isLength({ min: 5 })],
  AspirationController.createNewAspiration
);
router.get("/", AspirationController.getAllAspiration);
router.get("/:id", AspirationController.getAspirationByID);
router.put("/:id", AspirationController.updateAspiration);
router.delete("/:id", AspirationController.deleteAspiration);

module.exports = router;
