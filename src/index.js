import dotenv from 'dotenv';
import { checkUsersNotifications } from './checkUsers.js';
dotenv.config();

const ONE_MINUTE_IN_MS = 60 * 1000;

function scheduleTask(task, interval) {
    task();
    setInterval(task, interval);
}

scheduleTask(async () => {
    await checkUsersNotifications();
}, ONE_MINUTE_IN_MS * 2);
