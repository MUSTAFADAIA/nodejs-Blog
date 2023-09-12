const express = require("express");

const router = express.Router();


const {
  getPost,
  getPostId,
  creatPost,
  updatePost,
  delePost,
  uploadPostImage,
  resizeImage,
  status,
  
} = require("../controller/postController");

const authController = require("../controller/authController");

const commentRoute = require("../routes/commentRoute");
//post   post/854efd45ed45ef45ef/comment
//get   post/854efd45ed45ef45ef/comment
//get   post/854efd45ed45ef45ef/comment/45rf45f45fg45f45df45
router.use("/:postId/comment", commentRoute);


router
  .route("/")
  .get(getPost)
  .post(
    authController.protect,
    authController.allowedTo("author", "admin"),
    uploadPostImage,
    resizeImage,
    creatPost,
    status
  );
router
  .route("/:id")
  .get(getPostId)
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    uploadPostImage,
    resizeImage,
    updatePost
  )
  .delete(authController.protect, authController.allowedTo("admin"), delePost);

module.exports = router;
