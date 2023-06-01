// 测试 token 的加密 与 验证过程

const jwt = require("jsonwebtoken")
const config = require("../config/default.json")
const secret= config.secret

const JWT = {
  generate(value,expires) {
    return jwt.sign(value, secret, { expiresIn: expires });
  },
  verify(token) {
     try {
     return jwt.verify(token,secret)} // payload is： { _id: '644a5e2122305822849c6c4a', username: 'admin', iat: 1683548357, exp: 1683551957}
     catch (e) {
          return false;
     }
  },
};

module.exports = JWT