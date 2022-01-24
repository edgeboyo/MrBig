function setUpCommands(client) {
  client.application.commands.create({
    name: "test",
    description: "A test command",
  });
}

module.exports = { setUpCommands };
