const express = require("express");
const route = express.Router();
const Product = require("../db/models/Product");
const productScraper = require("../modules/product_scraper");

route.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

route.post("/", async (req, res) => {
  const { ASIN } = req.body;
  const product = await Product.findOne({ ASIN });

  if (!product) {
    try {
      const productInfo = await productScraper.scrape(ASIN);
      let newProduct = new Product(productInfo);
      await newProduct.save();

      res.status(200).json(productInfo);
    } catch (err) {
      console.error("Error ", err);
      res.status(500).send("Failed to add the product");
    }
  } else {
    res.status(500).send("You've already added that product");
  }
});

route.delete("/:ASIN", async (req, res) => {
  const { ASIN } = req.params;
  try {
    await Product.deleteOne({ ASIN });
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send("Failed to delete the product");
  }
});

module.exports = route;
