const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const productsRouter = require("./routes/Product");
const db = require("./db");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

db.connect().then(() => {
  app.use("/api/products", productsRouter);

  app.use(express.static(path.join(__dirname, "build")));

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
  // Serve products route
  app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  app.listen(PORT, () => {
    console.log("Started Server ");
  });
});
