const mongoose = require("mongoose");
const Joi = require("joi");

//creating practitioner model

const GPSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 2, maxlength: 50 },
  hashedPassword: { type: String, required: true },
  birth_year: Number,
  occupation: { type: String, enum: ["nurse", "doctor", "specialist"] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  avatar: String,
  isadmin:Boolean
});
// GPmodel

const GPModel = mongoose.model("GP", GPSchema);

//JOI Validation
function validateGP(GP) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,20}$"))
      .messages({ "string.min": "should have a minimum length of 3" }),
    repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "repeat_password must match password",
    }),
    birth_year: Joi.number().integer().min(1900).max(2013),
    occupation: Joi.required(),
    avatar: Joi.string().optional().allow(null, ""),
    isadmin:Joi.boolean()
  });
  return schema.validate(GP);
}

module.exports.GPSchema = GPSchema;
module.exports.GPModel = GPModel;
module.exports.validateGP = validateGP;
