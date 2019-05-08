const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/Product");
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

app.use(bodyParser.json());

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("Connected !!");
});

app.use("/api/products", productsRouter);

app.use((err, req, res, next) => {
  console.log("Error Middleware");
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5000, () => {
  console.log("Started Server ");
});
