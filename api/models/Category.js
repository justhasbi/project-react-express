const Mongoose = require("mongoose");

const CategorySchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Category", CategorySchema);