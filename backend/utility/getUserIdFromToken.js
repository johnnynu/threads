const jwt = require("jsonwebtoken");
const admin = require("../firebase");
require("dotenv").config();

function getUserIdFromToken(token) {
  const tokenWithoutBearer = token.replace("Bearer ", "");
  console.log("Token in getUserId function", tokenWithoutBearer);
  console.log("Token in getUserId function", tokenWithoutBearer);

  return admin
    .auth()
    .verifyIdToken(tokenWithoutBearer)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log("Decoded token in getUserId function", decodedToken);
      console.log("UserId in getUserId function", uid);
      return uid;
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      return null;
    });
}

module.exports = getUserIdFromToken;
