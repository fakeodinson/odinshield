module.exports = {
	name: 'ping',
	async run(client, message) {
		const m = await message.channel.send("Your ping is...");
		m.edit(`${m.createdTimestamp - message.createdTimestamp}ms`);
	}
}