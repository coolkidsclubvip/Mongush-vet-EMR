const historyService = require("../services/historyService");
const petService = require("../services/petService");

const historyController = {
  getHistoryList: async function (req, res) {
    const { page, limit } = req.query;
    const data = await historyService.getHistoryList(page, limit);
    res.status(200).send(data);
  },

  dischargePet: async function (req, res) {
    const id = req.params.id;
    await historyService.addPetHistory(req);
    // await petService.deletePet(id);
  },

  deletePetHistory: async function (req, res) {
    await historyService.deletePetHistory(req.params.id);
    res.json("information deleted!");
  },
};

module.exports = historyController;
