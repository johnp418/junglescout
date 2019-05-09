const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  ASIN: String,
  name: String,
  category: String,
  dimension: String,
  rank: Number,
  imageUrl: String
});

module.exports = mongoose.model("Product", ProductSchema);
