const { petModel, historyModel } = require("../models/petModel");

const historyService = {

  getHistoryList: (page, limit) => {
    return historyModel
      .find({}, [
        "name",
        "species",
        "age",
        "owner_name",
        "owner_phone",
        "GP_in_charge",
        "admission_date",
        "discharge_date",
      ])
      .sort({
        discharge_date: -1,
      });
    // .skip((page - 1) * limit) // 跳过的页数 X 每页的个数
    // .limit(limit)
    //    .then((data) => {});
  },

  addPetHistory: async function (req, res) {
    // find the pet
    console.log("Req in addPetHistory is:",req);
    id = req.params.id;
    let pet = await petModel.findById({ _id: req.params.id });
    console.log("pet is",pet);
    const {
      name,
      species,
      age,
      owner_name,
      owner_phone,
      GP_in_charge,
      admission_date,
    } = pet;
    const discharged_date = Date.now().toLocaleString();

    await historyModel
      .create({
        name,
        age,
        species,
        owner_name,
        owner_phone,
        GP_in_charge,
        admission_date,
        discharged_date,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deletePetHistory: async (id) => {
    await historyModel.deleteOne({ _id: id }).then(data => console.log(data))
  },
};

module.exports = historyService;
