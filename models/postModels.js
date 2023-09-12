const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "too short produect title"],
      maxlength: [100, "too long product title"],
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   lowercase: true,
    // },

    content: {
      type: String,
      required: true,
      minlength: [3, "too short produect title"],
      maxlength: [100, "too long product title"],
    },
    image: [String],

    // status: [
    //   {
    //     draft: {
    //       type: Boolean,
    //     },
    //     published: {
    //       type: Boolean,
    //     },
    //   },
    // ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishdate: Date,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    authors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
    },
    tag: [        
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",  
      },
    ],
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/post/${doc.image}`;
    doc.image = imageUrl;
  }
};

//getone ,getAll,update
postSchema.post("init", (doc) => {
  setImageURL(doc);
});

//ceate
postSchema.post("save", (doc) => {
  setImageURL(doc);
});

// postSchema.pre(/^find/, function (next) {
// //   this.populate({
// //     path: "category",
// //     delect: "name-_id",
// //   })
// this.populate({
//       path: "tag",
//       delect: "name-_id",
//     })
//     .populate({
//       path: "author",
//       delect: "_id firstname lastname email ",
//     });
//   next();
// });

module.exports = mongoose.model("post", postSchema);
