require("dotenv").config();
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;

const mongoose = require("mongoose");
const mongodbUrl =
  dbUrl || `mongodb://${user}:${password}@ds153566.mlab.com:53566/junglescout`;

module.exports = {
  connect: () => {
    return mongoose.connect(mongodbUrl, { useNewUrlParser: true });
  }
};
