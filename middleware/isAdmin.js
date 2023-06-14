const JWT = require("../util/JWT");
const config = require("../config/default.json");
const secret = process.env.SECRET;

function isAdmin(req, res, next) {
  // Get the token from the Authorization header by removing the "Bearer " prefix
  const token = req.headers.authorization?.split(" ")[1];
  //  console.log(" &&token is", token);

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    // Verify the token and get the decoded payload
    const payload = JWT.verify(token);

    const isadmin = payload.isadmin;

    if (!isadmin) {
      return res.status(403).send("You need admin permission to access this");
    }

    // Attach the isAdmin property to the request object for further use
    //     req.isAdmin = isadmin;

    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}

module.exports = isAdmin;
