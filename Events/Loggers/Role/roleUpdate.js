// -*-coding:utf-8 -*-
// -------------------------------------------------------------------------
// Path          - DiscordBot/Events/Loggers/Role/roleUpdate.js
// Git           - https://github.com/The-Repo-Club
// Author        - The-Repo-Club [wayne6324@gmail.com]
// Start On      - Wed 23 February 2022, 12:04:54 pm (GMT)
// Modified On   - Wed 23 February 2022, 12:06:14 pm (GMT)
// -------------------------------------------------------------------------
// Logs whenever permissions, name, color, icon, hoist, mentionnable of a role changed

// const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
// const DB = require("../../../Structures/Schemas/logsDB");

// module.exports = {
// 	name: "roleUpdate",
// 	/**
// 	 * @param {Role} oldRole
// 	 * @param {Role} newRole
// 	 * @param {Client} client
// 	 */
// 	async execute(oldRole, newRole, client) {
// 		const Data = await DB.findOne({
// 			GuildID: guild.id,
// 		});
// 		if (!Data) return;

// 		const logsChannel = oldRole.guild.channels.cache.get(Data.LogsChannel);
// 		const logs = await oldRole.guild.fetchAuditLogs({
// 			limit: 1,
// 			type: "ROLE_UPDATE",
// 		});
// 		const log = logs.entries.first(); // Fetches the logs and takes the last entry

// 		const roleUpdateEmbed = new MessageEmbed()
// 			.setTitle(
// 				"<:icons_updaterole:866943415278895114> A Role Has Been Updated"
// 			)
// 			.setColor("ORANGE")
// 			.setTimestamp()
// 			.setFooter(oldRole.guild.name);

// 		if (log) {
// 			// If entry first entry is existing executes code
// 			if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
// 				const p = new Permissions(newRole.permissions.bitfield)
// 					.toArray()
// 					.slice(" ")
// 					.map((e) => `\`${e}\``)
// 					.join(" ")
// 					.toLowerCase()
// 					.replaceAll("_", " ");

// 				roleUpdateEmbed
// 					.setDescription(
// 						`> The permissions of ${newRole} has been changed by \`${log.executor.tag}\``
// 					)
// 					.addField("New permissions", p);
// 			}

// 			if (oldRole.name !== newRole.name) {
// 				// If name changed executes code
// 				roleUpdateEmbed
// 					.setDescription(
// 						`> The name of ${newRole} has been updated by \`${log.executor.tag}\``
// 					)
// 					.addFields(
// 						{
// 							name: "Old name",
// 							value: `\`${oldRole.name}\``,
// 						},
// 						{
// 							name: "New name",
// 							value: `\`${newRole.name}\``,
// 						}
// 					);
// 			}

// 			if (oldRole.color !== newRole.color) {
// 				// If color changed executes code
// 				roleUpdateEmbed
// 					.setDescription(
// 						`> The color of ${newRole} has been updated by \`${log.executor.tag}\``
// 					)
// 					.addFields(
// 						{
// 							name: "Old color",
// 							value: `\`${oldRole.color}\``,
// 						},
// 						{
// 							name: "New color",
// 							value: `\`${newRole.color}\``,
// 						}
// 					);
// 			}

// 			if (oldRole.icon !== newRole.icon) {
// 				// If icon changed executes code
// 				roleUpdateEmbed
// 					.setDescription(
// 						`> The icon of ${newRole} has been changed by \`${log.executor.tag}\``
// 					)
// 					.setImage(newRole.iconURL())
// 					.addFields(
// 						{
// 							name: "Old icon",
// 							value: oldRole.icon ? `${oldRole.iconURL()}` : "No icon before",
// 						},
// 						{
// 							name: "New icon",
// 							value: newRole.icon ? `${newRole.iconURL()}` : "No new icon",
// 						}
// 					);
// 			}

// 			if (!oldRole.hoist && newRole.hoist) {
// 				// If old role isnt hoist and new role is it means the role has been set to hoist true
// 				roleUpdateEmbed.setDescription(`> The role ${newRole} is now hoist`);
// 			} else if (oldRole.hoist && !newRole.hoist) {
// 				// If old role is hoist and new role isnt it means the role has been removed from hoist false
// 				roleUpdateEmbed.setDescription(
// 					`> The role ${newRole} is not hoist anymore`
// 				);
// 			}

// 			if (!oldRole.mentionable && newRole.mentionable) {
// 				// If old role isnt mentionable and new role is it means the role has been set to mentionable true
// 				roleUpdateEmbed.setDescription(
// 					`> The role ${newRole} is now mentionable`
// 				);
// 			} else if (oldRole.mentionable && !newRole.mentionable) {
// 				// If old role is mentionable and new role isnt it means the role has been removed from mentionable false
// 				roleUpdateEmbed.setDescription(
// 					`> The role ${newRole} is not mentionable anymore`
// 				);
// 			}
// 		}

// 		async function createAndDeleteWebhook(embedName) {
// 			await logsChannel
// 				.createWebhook(oldRole.guild.name, {
// 					// Creates a webhook in the logging channel specified before
// 					avatar: oldRole.guild.iconURL({ format: "png" }),
// 				})
// 				.then((webhook) => {
// 					webhook
// 						.send({
// 							// Sends the embed through the webhook
// 							embeds: [embedName],
// 						})
// 						.then(() => webhook.delete().catch(() => {})); // Deletes the webhook and catches the error if any
// 				});
// 		}

// 		logsChannel
// 			.send({ embeds: [roleUpdateEmbed] })
// 			.catch((err) => console.log(err));
// 	},
// };