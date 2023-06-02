const historyService = require("../services/historyService");
const petService = require("../services/petService");

const historyController = {
  getHistoryList: async function (req, res) {
    const { page, limit } = req.query;
    try {
      const data = await historyService.getHistoryList(page, limit);
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  dischargePet: async function (req, res) {
    const id = req.params.id;
    try {
      await historyService.addPetHistory(req);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  deletePetHistory: async function (req, res) {
    try {
      await historyService.deletePetHistory(req.params.id);
      res.json("information deleted!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
};

module.exports = historyController;
