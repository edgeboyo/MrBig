var admin = require("firebase-admin");

var serviceAccount = require("./firebase.json");

var { onSnapshot, query, doc } = require("firebase/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function setUpListener(docRef, client) {
  const unsubscribe = docRef.onSnapshot(async (document) => {
    const data = document.data();

    console.log("SNAPSHOT UPDATE: ");
    console.log(data);

    if ("attachmentUrl" in data) {
      const guild = await client.guilds.fetch(data.guildId);
      const channel = await guild.channels.fetch(data.channelId);
      const member = await guild.members.fetch(data.userId);

      await channel.send({
        content: "Attachment",
        files: [data["attachmentUrl"]],
      });

      unsubscribe();

      await docRef.delete();
    }
  });
}

async function createNewPath(guildId, channelId, userId, client) {
  const collection = admin.firestore().collection("paths");

  const docRef = await collection.add({
    guildId,
    channelId,
    userId,
    timestamp: new Date().getTime(),
  });

  setUpListener(docRef, client);

  return docRef.id;
}

async function fetchListeners(client) {
  const collections = admin.firestore().collection("paths");

  const docs = await collections.listDocuments();

  docs.forEach((docRef) => {
    setUpListener(docRef, client);
  });
}

module.exports = { createNewPath, fetchListeners };
