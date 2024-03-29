/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Events/Loggers/Guild/guildMemberAdd.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:19:47 PM [GMT]
 *
 *Description:
 *   guildMemberAdd Event for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, canvas, channelsDB
 **/

const { MessageEmbed, GuildMember, MessageAttachment } = require("discord.js");
const DB = require("../../Structures/Schemas/channelsDB"); //Make sure this path is correct
const { green, yellow } = require("../../Structures/colors.json");
const Canvas = require("../../Systems/Canvas/index");

module.exports = {
	name: "guildMemberAdd",
	path: "Member/guildMemberAdd.js",
	/**
	 * @param {GuildMember} member
	 */
	async execute(member) {
		const Data = await DB.findOne({
			GuildID: member.guild.id,
		});
		if (!Data || !Data.logs.joinLeaveLogs) return;

		const logsChannel = member.guild.channels.cache.get(
			Data.logs.joinLeaveLogs
		);
		const logs = await member.guild.fetchAuditLogs({
			limit: 1,
		});
		const log = logs.entries.first(); // Fetches the logs and takes the last entry

		if (log.action == "BOT_ADD") {
			// If the last entry fetched is of the type "BOT_ADD" it means a bot has joined
			const botJoinedEmbed = new MessageEmbed()
				.setTitle(
					"<:icons_unbanmember:949376464388784138> A Bot Joined The Server"
				)
				.setColor(green)
				.setTimestamp()
				.setFooter({ text: member.guild.name })
				.setDescription(
					`> The bot ${member} has been added by \`${log.executor.tag}\` to this server`
				);

			logsChannel
				.send({ embeds: [botJoinedEmbed] })
				.catch((err) => console.log(err));
		} else {
			// Else it means a normal user joined
			const image = await new Canvas.Welcome()
				.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setAvatar(member.displayAvatarURL({ format: "png", size: 512 }))
				.setMemberCount(member.guild.memberCount)
				.setGuildName(member.guild.name)
				.setColor("Background", yellow)
				.toAttachment();
			const attachment = new MessageAttachment(
				image.toBuffer(),
				"MemberWelcomeCard.png"
			);
			logsChannel
				.send({ files: [attachment] })
				.catch((err) => console.log(err));
		}
	},
};
