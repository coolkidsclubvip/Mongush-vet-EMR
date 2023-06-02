const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");
const multer = require("multer");
const upload = multer().none(); // no upload, use file none()

// render pet page
router.get("/", function (req, res, next) {
  res.render("pet", { title: "Pet Records" });
});

// add a new pet
router.post("/", petController.addPet);

// delete a pet
router.delete("/:id", petController.deletePet);

// get a list of pets and render when loading
router.get("/list", petController.getPetList);

// auth token
// router.post("/login", petController.login);

// log out(to destroy session)
router.get("/logout", petController.logout);

module.exports = router;
