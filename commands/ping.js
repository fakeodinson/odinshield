async function commandcode() {
		const m = await message.channel.send("Ping?");
		m.edit(`${m.createdTimestamp - message.createdTimestamp}ms.`);
}

module.exports = {
	name: 'ping',
	commandcode
};