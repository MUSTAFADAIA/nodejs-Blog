const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
      unique: true,
    },

    lastname: {
      type: String,
      unique: true,
      required: [true, "last_name is required"],
    },
    bio: {
      type: String,
      required: true,
      minlength: [20, "too short product description"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    links: {
       type: String 
      // twitter: { type: String },
    },
  },
  { timestamps: true }
);

const AuthorsModels = mongoose.model("Authors", authorsSchema);
module.exports = AuthorsModels;
