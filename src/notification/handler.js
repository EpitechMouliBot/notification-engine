import { sendAPICall } from "../apiCall.js";
import { calculateSkillsPercent, getCompleteNorme, getCompleteStatus, getCompleteUrl, getPercentColor } from "./getInformations.js";
import { checkEmail } from "./utils.js";

function sendEmail(emailInstance, email, data) {
    if (!email || checkEmail(email) === false)
        return;

    emailInstance.sendEmail(
        'thomas.ott@epitech.eu',
        data['skills_percent'],
        data['skills_color'],
        data['formated_url'],
        data['project_name'],
        data['formated_status'],
        data['formated_norme']
    );
}

export async function handleNotification(instances, userData, lastTestRunData, year) {
    try {
        // sendAPICall('PUT', `/user/id/${userInfo['id']}`, process.env.API_DB_TOKEN, {
        //     'last_testRunId': lastTestRunData.id,
        // }).catch((err) => {
        //     console.log(err);
        // });

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
            "date": lastTestRunData['data']['date']
        }

        data['skills_percent'] = calculateSkillsPercent(data['result_skills']);
        data['skills_color'] = getPercentColor(data['skills_percent']);
        data['formated_url'] = getCompleteUrl(data['code_module'], data['project_slug'], data['testRunId'], year);
        data['formated_status'] = getCompleteStatus(data['externalItems'], '<br>');
        data['formated_norme'] = getCompleteNorme(data['externalItems'], '<br>');


        if (userData['email_status'] === 1)
            sendEmail(instances['email'], userData['email'], data); // check if email is not undefined
        data['formated_status'] = getCompleteStatus(data['externalItems'], '\n');
        data['formated_norme'] = getCompleteNorme(data['externalItems'], '\n');

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
