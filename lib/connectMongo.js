//connection to database
const mongoose = require("mongoose");
const config = require("../config/default.json");

const connectMongo = async () => {
  try {
    const connectionResult = await mongoose.connect(
      config.db.connectionString,
      { useNewUrlParser: true }
    );
    if (connectionResult) {
      console.log("connected to MongoDB");
    }
  } catch (err) {
    (err) => console.error("Error connecting", err);
  }
};

export default connectMongo;
