// -------------------------------------------------------------------------
// Path          - DiscordBot/Structures/Handlers/errors.js
// GitHub        - https://github.com/The-Repo-Club/
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Mon 14 March 2022, 07:58:44 pm (GMT)
// Modified On   - Mon 14 March 2022, 07:59:17 pm (GMT)
// -------------------------------------------------------------------------

const { MessageEmbed, WebhookClient } = require("discord.js");

const {
	errorWebhookID,
	errorWebhookToken,
	botsDevID,
} = require("../config.json");
const { red } = require("../colors.json");

const sendWebhook = (content, err) => {
	const errorWebhookSend = new WebhookClient({
		id: errorWebhookID,
		token: errorWebhookToken,
	});

	if (!content && !err) return;
	const errString = err?.stack || err;

	const embed = new MessageEmbed()
		.setColor(red)
		.setAuthor({ name: err?.name || "Error" })
		.setTitle(`🟥 **There was a ${content}** 🟥`)
		.setDescription(
			"```js\n" +
				(errString.length > 4096
					? `${errString.substr(0, 4000)}...`
					: errString) +
				"\n```"
		);

	if (err?.description) embed.addField("Error Description", err?.description);
	if (content) embed.addField("Error Type", content);
	if (err?.message) embed.addField("Error Message", err?.message);

	if (botsDevID)
		return errorWebhookSend.send({
			content: `<@${botsDevID}> There seems to have been an error.`,
			username: "Console Logs",
			// avatar: channel.guild.iconURL({ format: "png" }),
			embeds: [embed],
		});
	errorWebhookSend.send({
		content: "There seems to have been an error.",
		username: "Console Logs",
		embeds: [embed],
	});
};

process.on("uncaughtException", (exception) => {
	console.log(exception);
	if (!errorWebhookID || !errorWebhookToken)
		return console.warn(
			"Without the errorWebhook logging errors will not work..."
		);
	sendWebhook("uncaughtException", exception);
});

process.on("unhandledRejection", (rejection) => {
	console.log(rejection);
	if (!errorWebhookID || !errorWebhookToken)
		return console.warn(
			"Without the errorWebhook logging errors will not work..."
		);
	sendWebhook("unhandledRejection", rejection);
});
