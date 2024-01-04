// import { SlashCommandBuilder } from '@discordjs/builders';
// import { setNotificationEmbed } from '../../notification/discord.js';

// async function sendLastMouli(interaction, mouliOffset, years) {
//     if (!await errorHandlingTokens(interaction)) return;
//     const email = tokens[interaction.user.id].email;

//     sendRELAYCall('GET', `/${email}/epitest/me/${years}`).then(async (response) => {
//         if (response.status === 200) {
//             const relayData = response.data;
//             const actualYears = new Date().getFullYear();

//             if (relayData === undefined) {
//                 await interaction.reply({ content: `Failed to get test, please report issue on github (please provide as much informations as you can)`, ephemeral: true });
//                 return;
//             }
//             if (mouliOffset > 100) {
//                 await interaction.reply({ content: `Offset too high, please retry with a lower offset (<100)`, ephemeral: true });
//                 return;
//             }
//             if (years < actualYears - 10 || relayData.length < 1) {
//                 await interaction.reply({ content: `Any test found with this offset`, ephemeral: true });
//                 return;
//             }
//             if (relayData.length < mouliOffset * -1) {
//                 sendLastMouli(interaction, mouliOffset - relayData.length * -1, years - 1);
//                 return;
//             }
//             const embed = setNotificationEmbed(relayData);
//             interaction.reply({ embeds: embed['embed'], files: embed['files'] })
//         }
//     }).catch(async (error) => {
//         if (!error.response) {
//             sendError(error);
//             await interaction.reply({ content: `Failed to get test, please report issue on github (please provide as much informations as you can)`, ephemeral: true });
//         } else {
//             if (error.response.status !== 403)
//                 sendError(error);
//             switch (error.response.status) {
//                 case 403:
//                     await interaction.reply({ content: `Authorization denied, please \`/login\` and retry`, ephemeral: true });
//                     break;
//                 case 500:
//                     await interaction.reply({ content: `Internal server error, please report issue on github (please provide as much informations as you can)`, ephemeral: true });
//                     break;
//                 default:
//                     await interaction.reply({ content: `Error while trying to get test, please \`/login\` and retry`, ephemeral: true });
//             }
//         }
//     });
// }

// export let command = {
//     data: new SlashCommandBuilder()
//         .setName('mouli')
//         .setDescription('Get information about your last test')
//         .addNumberOption(option => option
//             .setName('offset')
//             .setDescription('The offset number of the test that you want to get (1 by default)')
//             .setRequired(false)
//         ),
//     async execute(interaction) {
//         let number = interaction.options.getNumber('offset') ?? -1;
//         if (number === 0)
//             number = -1;
//         if (number > 0)
//             number *= -1;
//         let actualYears = new Date().getFullYear();
//         await sendLastMouli(interaction, number, actualYears);
//     }
// };
