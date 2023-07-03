const mongoose = require("mongoose");
const Joi = require("joi");
const { GPSchema } = require("./GPModel");

//creating pet model
const petType = {
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  age: { type: Number },
  species: { type: String, required: true },
  owner_name: { type: String, required: true },
  owner_phone: {
    type: String,
    required: true,
  },
  GP_in_charge: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "gps", required: true },
    username: { type: String, required: true },
  },
  admission_date: {
    type: Date,
    default: Date.now(),
  },

};
// Pet model
const petModel = mongoose.models.pets || mongoose.model("pets", new mongoose.Schema(petType));

// Extend the existing pet model schema
const petSchema = mongoose.model("pets").schema;
petSchema.add({
  discharge_date: {
    type: Date,
    default: Date.now(),
  },
});

// Create the discharged pet model
const historyModel = mongoose.models.pet_discharged_history || mongoose.model(
  "pet_discharged_history",
  petSchema
);



//JOI Validation
function validatePet(pet) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number(),
    species: Joi.string().required(),
    owner_name: Joi.string().required(),
    owner_phone: Joi.string()
      .pattern(/^(?:\+61|0)[2-478](?:[ ]?\d{4}){2}$/)
      .required(),
    GPId: Joi.required(),
    admission_date: Joi.required(),
  });
  return schema.validate(pet);
}

module.exports.petModel = petModel;
module.exports.validatePet = validatePet;

module.exports.historyModel = historyModel;