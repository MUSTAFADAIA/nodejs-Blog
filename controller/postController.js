const postModels = require("../models/postModels");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

exports.uploadPostImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `post-${uuidv4()}-${Date.now()}.jpeg`;
  // await sharp(req.file.buffer)
  //   .resize(600, 600)
  //   .toFormat("jpeg")
  //   .jpeg({ quality: 90 })
  //   .toFile(`uploads/brands/${filename}`);

  //Save image into our db
  req.body.image = filename;
  next();
});

exports.status = (...status) =>
  asyncHandler(async (req, res, next) => {
    if (role.includes(req.post.status)) {
      return next(new ApiError("error status", 403));
    }
    next();
  });

//@desc    get list of Post
//@route   get /api/v1/Post
//@access  public
exports.getPost = factory.getAll(postModels);

//@desc   get specific Post by id
//@route  GET api/v1/Post/:id
//@access Public
exports.getPostId = factory.getOneId(postModels);

//@desc     Creat Post
//@route    post /api/v1/Post
//@access   private
exports.creatPost = factory.creatOne(postModels);

//@desc   update specific Post by id
//@route  PUT api/v1/Post/:id
//@access Private
exports.updatePost = factory.updateOne(postModels);

//@desc   Delete specific Post by id
//@route  Delete api/v1/Post/:id
//@access Private
exports.delePost = factory.deleteOne(postModels);
