const { validatePet, petModel } = require("../models/petModel");
const petService = require("../services/petService");
const { GPModel } = require("../models/GPModel");

const petController = {
  addPet: async function (req, res, next) {
    // Joi validation
    let { error } = validatePet(req.body);

    if (error) {
      console.log(error.message);
      res.status(400).send(error.details[0].message);

      // res.render("index", { registerError:"Invalid registration"});  NOT WORKING!!
      return;
    }

    const {
      name,
      age,
      species,
      owner_name,
      owner_phone,
      GPId,
      admission_date,
    } = req.body;

    // get the assigned GP with GPId
    let gp = await GPModel.findById(GPId);
    try {
      await petService.addPet(
        name,
        age,
        species,
        owner_name,
        owner_phone,
        {
          id: gp._id,
          username: gp.username,
        },
        admission_date
      );
      res.status(200).json("information uploaded!");
    } catch (error) {
      res.status(500).send("registration failed");
    }
  },

  updatePet: async function (req, res) {
    console.log(req.body, req.params.id);
    const { name, age, species, GPId, admission_date } = req.body;
    const id = req.params.id;
    try {
      await petService.updatePet(name, age, species, GPId, admission_date);
      res.status(200).json("information updated!");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deletePet: async function (req, res) {
    try {
      await petService.deletePet(req.params.id);
      res.json("information deleted!");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getPetList: async function (req, res) {
    const { page, limit } = req.query;
    try {
      const data = await petService.getPetList(page, limit);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // 退出登录（销毁session)
  logout: function (req, res) {
    req.session.destroy(() => {
      res.send({ ok: 1 });
    });
  },
};

module.exports = petController;
