const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const JWT = require("./util/JWT");
const fileUpload = require("express-fileupload"); //When you upload a file, the file will be accessible from req.files
const helmet = require("helmet");
const axios = require("axios");
const indexRouter = require("./routes/index");
const GPRouter = require("./routes/GP");
const petRouter = require("./routes/pet");
const loginRouter = require("./routes/login");
const historyRouter = require("./routes/history");
const uploadRouter = require("./routes/upload");
const errorRouter = require("./routes/error");
const authenticate = require("./middleware/auth");
const app = express();


//Setup Config
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/"; //Stores the location of the config in a ENV VAR
const config = require("./config/default.json"); //Allow you to have different configs for different environments

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //Parse incoming Form data, available
// app.use(fileUpload({ createParentPath: true })); // enable files upload
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//////////////////helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);

//////////////////////////// token/////////////////！！
app.use(authenticate);

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/api/GP", GPRouter);
app.use("/api/pet", petRouter);
app.use("/api/history", historyRouter);
// app.use("/*", errorRouter)

// // error handler// use toastr notification handler
app.use(function (err, req, res, next) {
  console.error("An error occurred:", err);
  res.status(500).json({ error: err.message });
});

module.exports = app;
