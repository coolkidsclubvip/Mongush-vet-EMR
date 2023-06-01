const JWT = require("../util/JWT");

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "MOGUSH VETERINARY CLINIC" });
});

module.exports = router;
