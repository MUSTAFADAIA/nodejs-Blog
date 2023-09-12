const tagModel = require("../models/tagModels");
const factory = require("./handlerFactory");






//@desc    get list of tag
//@route   get /api/v1/tag
//@access  public
exports.getTag = factory.getAll(tagModel);

//@desc   get specific tag by idf
//@route  GET api/v1/tag/:id
//@access Public
exports.getTagId = factory.getOneId(tagModel);
//@desc     Creat tag
//@route    post /api/v1/tag
//@access   private
exports.creatTag = factory.creatOne(tagModel);


//@desc   update specific tag by id
//@route  PUT api/v1/tag/:id
//@access Private
exports.updateTag = factory.updateOne(tagModel);

//@desc   Delete specific tag by id
//@route  Delete api/v1/tag/:id
//@access Private
exports.deleTag = factory.deleteOne(tagModel);