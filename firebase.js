var admin = require("firebase-admin");

var serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function createNewPath(guildId, channelId, userId) {
  const collection = admin.firestore().collection("paths");

  const doc = await collection.add({ guildId, channelId, userId });

  return doc.id;
}

module.exports = { createNewPath };
