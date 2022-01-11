const express = require("express");

const { catchErrors } = require("../helpers/errorHelper");
const authorize = require("../middleware/auth");
const DiscussionsController = require("../controllers/DiscussionsController");

// creates a new router instance.
const router = express.Router();

router.post("/",authorize, catchErrors(DiscussionsController.createNewDiscussion));
router.get("/", authorize, catchErrors(DiscussionsController.getAllDiscussion));
router.get("/:id", authorize, catchErrors(DiscussionsController.getDiscussionByID));
router.put("/:id", authorize, catchErrors(DiscussionsController.updateDiscussion));
router.delete("/:id", authorize, catchErrors(DiscussionsController.deleteDiscussion));

module.exports = router;