// connection to database
const mongoose = require("mongoose");
const config = require("./default.json")

mongoose
  .connect(process.env.MONGO_RAILWAY_CONNECT_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB server");
  })
  .catch((err) => console.error("connection failed", err));
  