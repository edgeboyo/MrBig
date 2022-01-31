const { createNewPath } = require("./firebase");

function setUpCommands(client) {
  const commands = [
    { name: "ping", description: "Ping command" },
    { name: "send", description: "Send an epic attach" },
  ];

  client.application.commands.set(commands);

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, guildId, channelId, user } = interaction;

    switch (commandName) {
      case "ping":
        await interaction.reply("Pong");
        break;
      case "send":
        const pathId = await createNewPath(guildId, channelId, user.id, client);
        await interaction.reply(
          `Link for attachment waiting for you in http://text.com/${pathId}`
        );
        break;
    }
  });
}

module.exports = { setUpCommands };
