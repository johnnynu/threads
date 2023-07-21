const admin = require("firebase-admin");

const serviceAccount = require("./utility/ghost-8a3f3-firebase-adminsdk-kuz4h-46d0c86cd6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
