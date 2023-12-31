import { REST, Routes } from 'discord.js';
import * as fs from 'node:fs';

import dotenv from 'dotenv';
dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.SERVER_ID;

const commands = [];
const commandFiles = fs.readdirSync('./src/discord/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`./src/discord/commands/${file}`);
    commands.push(command.command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            // use this when is not just for development
            // await rest.put(
            //     Routes.applicationCommands(clientId),
            //     { body: commands },
            // );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error.message);
    }
})();
