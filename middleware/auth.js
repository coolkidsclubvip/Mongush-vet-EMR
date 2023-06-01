const JWT = require("../util/JWT");

function authenticate(req, res, next) {
  //exlude req for login
  if (req.url.includes("login")) {
    next();
    return;
  }
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const payload = JWT.verify(token);
    console.log("@@@payload is", payload);
    if (payload) {
      //recalculate token expiration time
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username,
          isadmin: payload.isadmin,
        },
        "1h"
      );

      res.header("authorization", newToken);
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    next();
  }
}

module.exports = authenticate;
