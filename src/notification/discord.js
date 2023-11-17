import { EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { formatDate, getAdaptiveColor } from "./utils.js";

function createEmbed(title, description, statusContent, normeContent, testUrl, color) {

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .addFields(
            { name: 'Status', value: statusContent, inline: false },
            { name: 'Norme', value: normeContent, inline: false },
        )
        .setTimestamp()
        .setThumbnail('attachment://epitechmoulibot_logo.png')
        .setColor(color)
        .setFooter({ text: 'my.epitech.eu', iconURL: 'attachment://myepitech_logo.png' })
        .setURL(testUrl);
    return (embed);
}

function setNotificationEmbed(data) {
    const title = data['project_name'] + ' | ' + (data['skills_percent']).toString() + '%';
    console.log(data['date'], typeof (data['date']));
    const description = (formatDate(data['date'])).toString();
    const notificationEmbed = createEmbed(title, description, data['formated_status'], data['formated_norme'], data['formated_url'], getAdaptiveColor(data['skills_color']));
    const thumbnailImage = new AttachmentBuilder('./images/epitechmoulibot_logo.png');
    const footerImage = new AttachmentBuilder('./images/myepitech_logo.png')
    return ({ embed: [notificationEmbed], files: [thumbnailImage, footerImage] });
}

export async function sendDiscordNotification(discordInstance, channelId, userId, data) {
    try {
        const channel = await discordInstance.channels.fetch('974418168569274409');

        const embed = setNotificationEmbed(data);
        await channel.send({ content: `<@${userId}> New mouli !`, embeds: embed['embed'], files: embed['files'] });
    } catch (error) {
        throw error;
    }
}
