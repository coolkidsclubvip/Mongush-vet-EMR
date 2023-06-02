const { validateGP } = require("../models/GPModel");
const GPService = require("../services/GPService");
const JWT = require("../util/JWT");
const bcrypt = require("bcrypt");
const { GPModel } = require("../models/GPModel");
const { validateFile } = require("../util/validateFile");

const GPController = {
  // create a new GP and save it to the database
  addGP: async function (req, res, next) {
    console.log("req.body==", req.body);

    // Joi validation
    let { error } = validateGP(req.body);
    if (error) {
      console.log("error.message:", error.message);
      return res.status(400).json(error);

      // res.render("index", { registerError:"Invalid registration"});  NOT WORKING!!
    }

    const { username, password, birth_year, occupation, createdAt, isadmin } =
      req.body;

    //check if the user already exists
    const result = await GPModel.findOne({ username });
    if (result) {
      return { status: 400, message: "User already exists" };
    }

    //give a default avatar if no avatar is uploaded
    let avatar = "/uploads/avatar/defaultAvatar.jpg"; // avatar is a string now

    if (req.file) {
      console.log("req.file==", req.file);
      // validate uploaded avatar
      error = await validateFile(req.file, 1000000, "image");
      if (error) return res.status(400).send(error.message || error);

      let avatar = `/uploads/avatar/${req.file.filename}`; // use uploaded avatar
    }

    /////////////////bcrypt//////////
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await GPService.addGP(
        username,
        hashedPassword,
        birth_year,
        occupation,
        createdAt,
        avatar,
        isadmin
      );
      res.status(200).json("information uploaded!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  updateGP: async function (req, res) {
    console.log(req.body, req.params.id);
    const { hashedPassword } = req.body;
    const id = req.params.id;

    try {
    await GPService.updateGP(id, hashedPassword);
    res.status(200).json("information updated!");
  } catch(error){
    console.log(error);
      res.status(500).send(error.message)
  }
},

  deleteGP: async function (req, res) {
    try{
    await GPService.deleteGP(req.params.id);
    res.json("information deleted!");}
    catch (error){
       console.log(error);
      res.status(500).send(error.message)
    }
  },

  getGPList: async function (req, res) {
    const { page, limit } = req.query;

    try {
    const data = await GPService.getGPList(page, limit);
    res.status(200).send(data);}
    catch(error){  console.log(error);
    res.status(500).send(error.message) }
  },

  // Login authorization check
  login: async function (req, res) {
    const { username, password } = req.body;
    const data = await GPService.login(username, password); //data is a array
    console.log("login data is:", data);

    if (data.length === 0) {
      res.send({ ok: 0 });
    } else {
      //setup token

      const Bisadmin = Boolean(data[0].isadmin);
      const token = JWT.generate(
        { _id: data[0]._id, username: data[0].username, isadmin: Bisadmin },
        "1h"
      );
      //  console.log("##", data[0].isadmin);
      // token返回在header
      res.setHeader("Authorization", token);
      res.send({ ok: 1 });
    }
  },

  // Logout（destroy session)
  logout: function (req, res) {
    req.session.destroy(() => {
      res.send({ ok: 1 });
    });
  },
};

module.exports = GPController;
