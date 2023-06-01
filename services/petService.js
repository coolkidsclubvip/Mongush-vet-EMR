const { petModel, petHistoryModel } = require("../models/petModel");
const { GPModel } = require("../models/GPModel");




const petService = {
  addPet: async (
    name,
    age,
    species,
    owner_name,
    owner_phone,
    GP_in_charge,
    admission_date
  ) => {
    return await petModel
      .create({
        name,
        age,
        species,
        owner_name,
        owner_phone,
        GP_in_charge,
        admission_date,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updatePet: (
    name,
    age,
    species,
    owner_name,
    owner_phone,
    GP_in_charge,
    admission_date
  ) => {
    return PetModel.updateOne(
      { _id: req.params.id },
      { name, age, species, GP_in_charge, admission_date }
    ); //return is a must！！！
  },

  deletePet: (_id) => {
    return petModel.deleteOne({ _id }).then((data) => {
      console.log(data);
    });
  },

  getPetList: (page, limit) => {
    return petModel
      .find({}, [
        "name",
        "age",
        "species",
        "owner_name",
        "owner_phone",
        "GP_in_charge",
        "admission_date",
      ])
      .sort({
        GP_in_charge: 1,
      });
    // .skip((page - 1) * limit) // 跳过的页数 X 每页的个数
    // .limit(limit)
    //    .then((data) => {});
  },

  
};

module.exports = petService;
