var express = require("express");
var router = express.Router();
const GPModel = require("../models/GPModel");
const GPController = require("../controllers/GPController");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/avatar/" });
const isAdmin = require("../middleware/isAdmin");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Medical Practitioner" });
});

// add new GP
router.post("/", upload.single("avatar"), isAdmin, GPController.addGP);

// update a GP
router.put("/:id", isAdmin, GPController.updateGP);

// delete a GP
router.delete("/:id", isAdmin, GPController.deleteGP);

// show all GP
router.get("/list", GPController.getGPList);

module.exports = router;
