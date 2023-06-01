const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.get("/", function (req, res, next) {
  res.render("history", { title: "Discharge History" });
});

// render all the history
router.get("/list", historyController.getHistoryList);

// discharge a pet
router.post("/:id", historyController.dischargePet);

// delete a history
router.delete("/:id", historyController.deletePetHistory);

module.exports = router;
