const express = require("express");


const router = express.Router();
const {
  getuser,
  getuserId,
  creatuser,
  updateuser,
  deleuser,
  uploadUserImage,
  resizeImage,
  changeuserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData
} = require("../controller/userController");
const authController = require("../controller/authController");

router.get("/getMe", authController.protect, getLoggedUserData, getuser);
router.put("/changeMyPassword", authController.protect, updateLoggedUserPassword);
router.put("/updateMe", authController.protect, updateLoggedUserData);
router.delete("/deletMe", authController.protect,deleteLoggedUserData);




router.put(
  "/changePassword/:id",
  changeuserPassword
);

router
  .route("/")
  .get(authController.protect, authController.allowedTo("admin"), getuser)
  .post(
    // authController.protect,
    // authController.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    creatuser
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.allowedTo("admin"),
    getuserId
  )
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    updateuser
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleuser
  );

module.exports = router;
