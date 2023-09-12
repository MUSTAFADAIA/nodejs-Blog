const express = require("express");

const router = express.Router();
const {
  getTag,
  creatTag,
  getTagId,
  updateTag,
  deleTag,
} = require("../controller/tagController");
const authController = require("../controller/authController");

router
  .route("/")
  .get(getTag)
  .post(authController.protect, authController.allowedTo("author","admin"), creatTag);
router
  .route("/:id")
  .get(getTagId)
  .put(authController.protect, authController.allowedTo("admin"), updateTag)
  .delete(authController.protect, authController.allowedTo("admin"), deleTag);

module.exports = router;
