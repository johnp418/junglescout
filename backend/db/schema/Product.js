const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tech Challenge
// Given an Amazon product ASIN (a unique identifier amazon uses for its products),
// build an application that can fetch the category, rank & product dimensions of that product on Amazon,
// store that data in some sort of database,
// and display the data on the front-end. For example, the details for ASIN "B002QYW8LW" can be found here www.amazon.com/dp/B002QYW8LW .

// When you're done, please send over the repo and we'll go from there.

// When sending back your repo, if you could please let me know the following as well:
// What were the biggest challenges you faced in writing the challenge?
// Can you explain your thought process on how you solved the problem, and what iterations you went through to get to this solution?
// If you had to scale this application to handle millions of people adding in ASIN's in a given day, what considerations would you make?
// Why did you choose the technologies you used?

const ProductSchema = new Schema({
  ASIN: String,
  title: String,
  category: String,
  dimension: String,
  rank: Number
});

module.exports = mongoose.model("Product", ProductSchema);
