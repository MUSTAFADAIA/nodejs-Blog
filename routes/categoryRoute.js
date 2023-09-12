const express = require("express");

const router = express.Router();
const {
  getcategory,
  creatCategory,
  getcategories,
  updateCategory,
  delecategories,
} = require("../controller/categoryController");
const authController = require("../controller/authController");

router
  .route("/")
  .get(getcategory)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    creatCategory
  );
router
  .route("/:id")
  .get(getcategories)
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    updateCategory
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    delecategories
  );

module.exports = router;
