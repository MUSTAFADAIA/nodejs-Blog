const express = require("express");


const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../controller/authController");



router.route("/signup").post(signup);
router.route("/login").post( login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyResetCode").post(verifyPassResetCode);
router.route("/resetPassword").put(resetPassword);



module.exports = router;
