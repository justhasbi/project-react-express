const Mongoose = require("mongoose");

const PostSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true,
      unique: true
    },
    coverPhoto: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    category: {
      type: Array,
      required: false
    }
  },
  { timestamps: true}
);

module.exports = Mongoose.model("Post", PostSchema);