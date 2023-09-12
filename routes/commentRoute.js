const express = require("express");

const {
  getcomments,
  creatcomments,
  delecomments,
  creatfilterOpj,
  setPostAndUserIdToBody,
} = require("../controller/commentController");
const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(creatfilterOpj, getcomments)
  .post(setPostAndUserIdToBody, creatcomments);
router
  .route("/:id")
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    delecomments
  );

module.exports = router;
