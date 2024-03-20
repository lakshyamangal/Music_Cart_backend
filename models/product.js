const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  type: {
    type: String,
    enum: ["inEar", "onEar", "overEar"],
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
  },
  smallDescription: {
    type: String,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  available: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
  },
  about: {
    type: [String],
  },
  image: {
    type: [String],
  },
});
module.exports = mongoose.model("Product", productSchema);
