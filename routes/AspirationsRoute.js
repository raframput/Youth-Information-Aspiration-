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
router.get("/category/:category_name", AspirationsController.getAspirationByCategory);
router.get("/title/:aspiration_title", AspirationsController.getAspirationByTitle);
router.get("/limit/:limit", AspirationsController.getAspirationLimit);
// router.put("/:id", authorize, AspirationsController.updateAspiration);
router.delete("/:id", authorize, AspirationsController.deleteAspiration);

module.exports = router;