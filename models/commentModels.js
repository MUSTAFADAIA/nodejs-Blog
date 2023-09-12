const mongoose = require("mongoose");
// const post = require("./postModels");
const commentSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "comment must belong to user"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "comment must belong to post"],
    },
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name email" }).populate({
    path: "post",
    select: "title",
  });
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
