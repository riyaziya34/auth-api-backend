const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("MongoDB connected"));

  await mongoose.connect(`${process.env.Mongo_DB_URL}/Login`);
};
module.exports = connectDB;
