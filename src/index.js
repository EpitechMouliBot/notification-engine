import dotenv from 'dotenv';
import { checkUsersNotifications } from './checkUsers.js';
import EmailSender from './notification/email.js';
dotenv.config();

const ONE_MINUTE_IN_MS = 60 * 1000;

function scheduleTask(task, interval) {
    task();
    setInterval(task, interval);
}

try {
    const emailSender = new EmailSender();
    const instances = {
        'email': emailSender
    };

    scheduleTask(async () => {
        await checkUsersNotifications(instances);
    }, ONE_MINUTE_IN_MS * 2);
} catch (error) {

}
