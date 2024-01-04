import { sendAPICall, sendRELAYCall } from "./apiCall.js";
import { handleNotification } from "./notification/handler.js";

function getLastTestData(data) {
    if (data.length < 1)
        return 0;
    try {
        const lastTestData = data.slice(-1)[0];
        const testRunId = lastTestData['results']['testRunId'];
        return { data: lastTestData, id: testRunId };
    } catch {
        return null;
    }
}

async function checkForOneUser(instances, userData, year) {
    await sendRELAYCall("GET", `/${userData['email']}/epitest/me/${year}`)
        .then(async (rsp) => {
            const relayData = rsp.data;
            const actualYear = new Date().getFullYear();
            if (!relayData || (relayData.length < 1 && year >= actualYear - 6)) {
                await checkForOneUser(instances, userData, year - 1);
            }

            const lastTestRunData = getLastTestData(relayData);
            if (!lastTestRunData || lastTestRunData.id === 0 || !lastTestRunData.data ||
                (userData['last_testRunId'] && lastTestRunData.id === userData['last_testRunId']))
                return;
            await handleNotification(instances, userData, lastTestRunData, year);
        }
        ).catch((err) => {
            console.log(err);
        });
}

export async function checkUsersNotifications(instances) {
    const actualYear = new Date().getFullYear();

    sendAPICall("GET", "/user/status/ok", process.env.API_DB_TOKEN)
        .then(async (rsp) => {
            const userList = rsp.data;
            for (let i = 0; i < userList.length; ++i) {
                await checkForOneUser(instances, userList[i], actualYear);
            }
        }).catch((err) => {
            console.log(err);
        });
}
