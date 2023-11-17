import { sendAPICall } from "../apiCall.js";
import { sendNTFYCall } from "./push.js";
import { sendDiscordNotification } from "./discord.js";
import { calculateSkillsPercent, getCompleteNorme, getCompleteStatus, getCompleteUrl, getPercentColor } from "./getInformations.js";
import { checkEmail } from "./utils.js";

function sendEmail(emailInstance, email, data) {
    if (!email || checkEmail(email) === false)
        return;
    console.log(email)
    try {
        emailInstance.sendEmail(
            email,
            data['skills_percent'],
            data['skills_color'],
            data['formated_url'],
            data['project_name'],
            data['formated_status'],
            data['formated_norme']
        );
        console.log('Email sent');
    } catch (error) {
        console.error('Error when sending email:', error);
    }
}

function sendPushNotification(phoneTopic, data) {
    try {
        sendNTFYCall(phoneTopic, data['formated_url'], data['project_name'], data['skills_percent']);
        console.log('Push notification sent');
    } catch (error) {
        console.error('Error when sending sms:', error);
    }
}

async function sendDiscord(discordInstance, channelId, userId, data) {
    if (!channelId || !userId)
        return;
    try {
        await sendDiscordNotification(discordInstance, channelId, userId, data);
    } catch (error) {
        console.error('Error when sending discord:', error);
    }
}

function fillDataObject(lastTestRunData, year) {
    let data = {
        "project_slug": lastTestRunData['data']['project']['slug'],
        "project_name": lastTestRunData['data']['project']['name'],
        "project_skills": lastTestRunData['data']['project']['skills'],
        "code_module": lastTestRunData['data']['project']['module']['code'],
        "logins": lastTestRunData['data']['results']['logins'],
        "prerequisites": lastTestRunData['data']['results']['prerequisites'],
        "externalItems": lastTestRunData['data']['results']['externalItems'],
        "mandatoryFailed": lastTestRunData['data']['results']['mandatoryFailed'],
        "result_skills": lastTestRunData['data']['results']['skills'],
        "testRunId": lastTestRunData['data']['results']['testRunId'],
        "date": lastTestRunData['data']['date'],
    }

    data['skills_percent'] = calculateSkillsPercent(data['result_skills']);
    data['skills_color'] = getPercentColor(data['skills_percent']);
    data['formated_url'] = getCompleteUrl(data['code_module'], data['project_slug'], data['testRunId'], year);
    data['formated_status'] = getCompleteStatus(data['externalItems'], '<br>');
    data['formated_norme'] = getCompleteNorme(data['externalItems'], '<br>');
    return data;
}

export async function handleNotification(instances, userData, lastTestRunData, year) {
    try {
        // sendAPICall('PUT', `/user/id/${userInfo['id']}`, process.env.API_DB_TOKEN, {
        //     'last_testRunId': lastTestRunData.id,
        // }).catch((err) => {
        //     console.log(err);
        // });

        let data = fillDataObject(lastTestRunData, year);

        // if (userData['email_status'] === 1)
        //     sendEmail(instances['email'], userData['email'], data);

        data['formated_status'] = getCompleteStatus(data['externalItems'], '\n');
        data['formated_norme'] = getCompleteNorme(data['externalItems'], '\n');

        // if (userData['phone_status'] === 1)
        //     sendPushNotification(userData['phone_topic'], data);
        // if (userData['discord_status'] === 1)
        await sendDiscord(instances['discord'], userData['channel_id'], userData['user_id'], data);
        // await sendDiscord(instances['discord'], userData['channel_id'], userData['user_id'], data);
    } catch (err) {
        console.log(err);
    }
}
