//connection to database
const mongoose = require("mongoose");


const connectMongo = async () => {
  try {
    const connectionResult = await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
    });
    if (connectionResult) {
      console.log("connected to MongoDB");
    }
  } catch (err) {
    (err) => console.error("Error connecting", err);
  }
};

module.exports=connectMongo;
