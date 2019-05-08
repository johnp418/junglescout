const express = require("express");
const route = express.Router();
const productScraper = require("../modules/product_scraper");
const products = require("../db/products.json");

route.get("/", async (req, res) => {
  res.status(200).json(products);
});

// Add product to DB
route.post("/", async (req, res) => {
  const { ASIN } = req.body;
  // let ASIN = "B002QYW8LW";
  try {
    const product = await productScraper.scrape(ASIN);
    res.status(200).json(product);
  } catch (err) {
    console.error("Error ", err);
    res.status(500).send("Failed to add the product");
  }
});

// Delete product from DB
route.post("/:productId", (req, res) => {
  // TODO: Delete
});

module.exports = route;
