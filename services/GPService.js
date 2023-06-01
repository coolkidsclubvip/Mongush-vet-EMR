const { GPModel } = require("../models/GPModel");
const bcrypt = require("bcrypt");

const GPService = {
  addGP: (
    username,
    hashedPassword,
    birth_year,
    occupation,
    createdAt,
    avatar,
    isadmin
  ) => {
    return GPModel.create({
      username,
      hashedPassword,
      birth_year,
      occupation,
      createdAt,
      avatar,
      isadmin,
    }).then(() => {
      return { status: 200, message: "Register success" };
    });
  },

  updateGP: (id, hashedPassword) => {
    return GPModel.updateOne(
      { _id: id },
      { hashedPassword:hashedPassword }
    ); //return is a must！！！
  },

  deleteGP: (_id) => {
    return GPModel.deleteOne({ _id }).catch((err) => {
      console.log(err); toastr(err.message);
    });
  },

  getGPList: (page, limit) => {
    return GPModel.find({}, [
      "username",
      "birth_year",
      "occupation",
      "createdAt",
      "avatar",
    ]).sort({
      birth_year: 1,
    });
    // .skip((page - 1) * limit) // 跳过的页数 X 每页的个数
    // .limit(limit)
    //    .then((data) => {});
  },

  login: async (username, password) => {
    ////////bcrypt compare password//////////
    const emptyArr = [];
    const user = [];
    result = await GPModel.findOne({ username });
    user.push(result);

    if (!result) {
      return emptyArr;
    }

    if(user[0]&&user[0].hashedPassword) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        user[0].hashedPassword
      );

      if (!isPasswordMatch) {
        return emptyArr;
      }
    }
    return user;
  },

};

module.exports = GPService;
