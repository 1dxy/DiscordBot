/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Commands/Utilities/userinfo.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Wed 23 February 2022, 12:04:54 PM [GMT]
 *Last edited:
 *   Thu 17 March 2022, 01:13:27 PM [GMT]
 *
 *Description:
 *   User Info Command for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js
 **/

const { ContextMenuInteraction, MessageEmbed } = require("discord.js");
const { orange } = require("../../Structures/colors.json");

module.exports = {
	name: "userinfo",
	path: "Utilities/userinfo.js",
	permission: "ADMINISTRATOR",
	type: "USER",

	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 */
	async execute(interaction) {
		const Target = await interaction.guild.members.fetch(interaction.targetId);
		const member = interaction.guild.members.cache.get(Target.id);

		const Responce = new MessageEmbed()
			.setColor(orange)
			.setAuthor({
				name: Target.user.tag,
				iconURL: Target.avatarURL({ dynamic: true, size: 512 }),
			})
			.setThumbnail(Target.user.avatarURL({ dynamic: true, size: 512 }))
			.addField("ID", `${Target.user.id}`, true)
			.setFields(
				{
					name: "Name",
					value: `\`${member.user.username}\``,
					inline: false,
				},
				{
					name: `<:ID:947583447529029692> ID`,
					value: `\`${member.user.id}\``,
					inline: false,
				},
				{
					name: "<:createdAt:947583447466139739> Created At",
					value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
					inline: false,
				},
				{
					name: "<:join:947583447038300291> Join at",
					value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
					inline: false,
				},
				{
					name: "<:roles:947583447432560711> Nickname",
					value: `\`${member.nickname ? member.nickname : `\`None\``}\``,
					inline: false,
				},
				{
					name: "<:online:947583880720949258> Presence",
					value: `\`${member.presence.status || `offline`}\``,
					inline: false,
				}
			);

		interaction.reply({ embeds: [Responce], ephemeral: true });
	},
};
