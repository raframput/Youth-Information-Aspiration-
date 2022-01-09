const express = require("express");

const authorize = require("../middleware/auth");
const AspirationsController = require("../controllers/AspirationsController");
const {upload} = require('../helpers/filehelper');

// creates a new router instance.
const router = express.Router();

router.post("/", upload.single("aspiration_image"), AspirationsController.createNewAspiration);
router.get("/", AspirationsController.getAllAspiration);
router.post("/:id", authorize, AspirationsController.createNewAspirationByUserId);
router.get("/:id", AspirationsController.getAspirationByUserID);
// router.put("/:id", authorize, AspirationsController.updateAspiration);
router.delete("/:id", authorize, AspirationsController.deleteAspiration);

module.exports = router;