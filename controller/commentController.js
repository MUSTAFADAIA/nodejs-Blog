const factory = require("./handlerFactory");
const commentModels = require("../models/commentModels");

exports.setPostAndUserIdToBody = (req, res, next) => {
  //Nested route
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

//Nested Route
//get  /api/v1/post/:postId/comments
exports.creatfilterOpj = (req, res, next) => {
  let filterOpject = {};
  if (req.params.postId) filterOpject = { post: req.params.postId };
  req.filterOpj = filterOpject;
  next();
};

//@desc    get list of comments
//@route   get /api/v1/comments
//@access  public
exports.getcomments = factory.getAll(commentModels);

//@desc     Creat comments
//@route    post /api/v1/comments
//@access   private/Post/user
exports.creatcomments = factory.creatOne(commentModels);

//@desc   Delete specific comments by id
//@route  Delete api/v1/comments/:id
//@access Private/Post/user-Admin
exports.delecomments = factory.deleteOne(commentModels);
