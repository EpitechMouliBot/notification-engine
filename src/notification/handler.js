import { sendAPICall } from "../apiCall.js";

function sendEmail(email, lastTestRunData) {
    
}

export async function handleNotification(userData, lastTestRunData) {
    try {
        sendAPICall('PUT', `/user/id/${userInfo['id']}`, process.env.API_DB_TOKEN, {
            'last_testRunId': lastTestRunData.id,
        }).catch((err) => {
            console.log(err);
        });

        if (userData['email_status'] === 1)
            sendEmail(userData['email'], lastTestRunData); // check if email is not undefined
        // if (userData['discord_status'] === 1)
        //     sendDiscord(userData['channel_id'], userData['user_id'], lastTestRunData); // check if channel_id and user_id are not undefined
        // if (userData['phone_status'] === 1)
        //     sendSMS(userData['phone'], lastTestRunData); // check if phone number is not undefined
        // if (userData['telegram_status'] === 1)
        //     sendTelegram(userData['telegram_id'], lastTestRunData); // check if telegram_id is not undefined

    } catch (err) {
        console.log(err);
    }
}
