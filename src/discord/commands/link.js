import { SlashCommandBuilder } from '@discordjs/builders';

function setUserIdInDb(id, token, discordUserId) {
    sendAPICall('PUT', `/user/id/${id}`, token, {
        "discord_user_id": discordUserId
    }).catch((error) => {
        sendError(error);
    });
}

async function cmdDiscordLink(interaction, email, password) {
    executeDBRequest('POST', `auth/login`, "", {
        "email": email,
        "password": password
    }).then(async (response) => {
        if (response.status === 201) {
            setUserIdInDb(response.data.id, response.data.token, interaction.user.id);
            await interaction.reply({ content: "You have successfully link your discord account at your EpitechMouliBot account !", ephemeral: true });
        }
    }).catch(async (error) => {
        sendError(error);
        if (!error.response)
            await interaction.reply({ content: `Failed to login, please report issue on github (please provide as much informations as you can)`, ephemeral: true });
        else
            switch (error.response.status) {
                case 400:
                    await interaction.reply({ content: `Bad credentials, please retry`, ephemeral: true });
                    break;
                case 500:
                    await interaction.reply({ content: `Internal server error, please report issue on github (please provide as much informations as you can)`, ephemeral: true });
                    break;
                default:
                    await interaction.reply({ content: `Error while trying to login, please report issue on github`, ephemeral: true });
            }
    });
}

export let command = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link your discord account to your EpitechMouliBot account')
        .addStringOption(option => option
            .setName('email')
            .setDescription('The email of your account')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('password')
            .setDescription('The password of your account')
            .setRequired(true)
        ),
    async execute(interaction) {
        await cmdDiscordLink(interaction, interaction.options.getString('email'), interaction.options.getString('password'));
    },
};
