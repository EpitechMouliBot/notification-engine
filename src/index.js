import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';
import { checkUsersNotifications } from './checkUsers.js';
import EmailSender from './notification/email.js';
// import { initCommands } from './initCommands.js';

import dotenv from 'dotenv';
dotenv.config();

const ONE_MINUTE_IN_MS = 60 * 1000;

function scheduleTask(task, interval) {
    task();
    setInterval(task, interval);
}

try {
    // const discordToken = process.env.DISCORD_BOT_TOKEN;
    // const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
    // discordClient.commands = new Collection();

    // await initCommands(discordClient);

    const emailSender = new EmailSender();
    const instances = {
        'email': emailSender,
        // 'discord': discordClient,
    };

    // discordClient.on('ready', async function () {
        scheduleTask(async () => {
            await checkUsersNotifications(instances);
        }, ONE_MINUTE_IN_MS * 2);
    //     console.log(`${discordClient.user.tag} is ready`);
    // });

    // discordClient.on(Events.InteractionCreate, async (interaction) => {
    //     if (!interaction.isChatInputCommand()) return;

    //     const command = interaction.discordClient.commands.get(interaction.commandName);

    //     if (!command) {
    //         await interaction.reply({ content: `No command matching ${interaction.commandName} was found.`, ephemeral: true });
    //         return;
    //     }
    //     try {
    //         await command.execute(interaction);
    //     } catch (error) {
    //         sendError(error);
    //         await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    //     }
    // });

    // discordClient.login(discordToken);
} catch (error) {
    console.log("Error: ", error);
}
