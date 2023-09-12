const authorsModels = require("../models/authorsModels");
const factory = require("./handlerFactory");

//@desc     Creat author
//@route    post /api/v1/auther
//@access   private
exports.creatAuthor = factory.creatOne(authorsModels);

// exports.creatAuthor = async (req, res) => {
//   const newAuthor = new authorsModels(req.body);
//   console.log(req.body);
//   try {
//     const savedPost = await newAuthor.save();
//     res.status(200).json(savedPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }

//@desc    get list of author
//@route   get /api/v1/author
//@access  public
exports.getAuthor = factory.getAll(authorsModels);

//@desc   get specific author by id
//@route  GET api/v1/author/:id
//@access Public
exports.getAuthorId = factory.getOneId(authorsModels);

//@desc   update specific author by id
//@route  PUT api/v1/author/:id
//@access Private
exports.updateAuthor = factory.updateOne(authorsModels);

//@desc   Delete specific author by id
//@route  Delete api/v1/author/:id
//@access Private
exports.deleAuthor = factory.deleteOne(authorsModels);
