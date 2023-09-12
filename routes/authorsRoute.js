const express = require("express");

const router = express.Router();


const {
  creatAuthor,
  getAuthor,
  getAuthorId,
  updateAuthor,
  deleAuthor,
} = require("../controller/authorsController");
const authController = require("../controller/authController");

router
  .route("/")
  .get(getAuthor)
  .post(authController.protect, authController.allowedTo("admin"), creatAuthor);

router
  .route("/:id")
  .get(getAuthorId)
  .put(authController.protect, authController.allowedTo("admin","author"), updateAuthor)
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleAuthor
  );

module.exports = router;
