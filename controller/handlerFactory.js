const ApiError = require("../middleware/errorMiddleware");
const ApiFeatures = require("../utils/apiFeatures");
const asyncHandler = require("express-async-handler");
const postModels = require("../models/postModels");

exports.deleteOne = (module) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const document = await module.findByIdAndDelete(id);
    if (!document) {
      // res.status(404).json({msg:`No category for this id ${id}`})
      return next(ApiError(`No document for this id ${id}`, 400));
    }
    // document.remove();
    res.status(200).send();
  });

exports.updateOne = (module) =>
  asyncHandler(async (req, res, next) => {
    if (req.body.status === "published") {
      req.body.publishedDate = new Date();
    }
    const document = await module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      // res.status(404).json({msg:`No category for this id ${id}`})
      return next(ApiError(`No document for this id ${req.params.id}`, 400));
    }
    document.save();
    res.status(200).json({ data: document });
  });

exports.creatOne = (module) =>
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const newDoc = await module.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOneId = (module, populationopt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    //1)Build query
    let query = module.findById(id);
    if (populationopt) {
      query = query.populate(populationopt);
    }
    //2)Execute query
    const document = await query;

    if (!document) {
      // res.status(404).json({msg:`No category for this id ${id}`})
      return next(ApiError(`No document for this id ${id}`, 400));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (module, modelName = " ") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filteObj) {
      filter = req.filteObj;
      
    }
   

    //Build query
    const countDocuments = await module.countDocuments();

    // console.log(req.query);
    const apiFeatures = new ApiFeatures(module.find(filter), req.query)
      // .page()
      .paginate(countDocuments)
      .limitFields()
      .search(modelName)
      // .readMoreUrl(response)
      const readMoreUrl = `http://localhost:3000/api/v1/post/${module.id}`;
      const response = {
        // title: module.title,
        content: readMoreUrl,
        // read_more: readMoreUrl,
      };
    // return responses
     
    // const content= req.query.content
    // content = req.query.content.substring(3)

    // .sort()
    // .filter();
    // .limit(req.post.content, 50);

    //Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const document = await mongooseQuery;

    
    
    res.status(200).json({
      content:response,
      results: document.length,
      paginationResult,
      data: document,
      
    });
  });
