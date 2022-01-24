function setUpCommands(client) {
  const commands = [
    { name: "ping", description: "Ping command" },
    { name: "send", description: "Send an epic attach" },
  ];

  client.application.commands.set(commands);

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
      case "ping":
        await interaction.reply("Pong");
        break;
      case "send":
        await interaction.reply(
          "Link for attachment waiting for you in http://text.com"
        );
        break;
    }
  });
}

module.exports = { setUpCommands };
