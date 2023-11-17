export async function sendNTFYCall(topic, testUrl, projectName, percentPassed) {
    fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        headers: {
            'Priority': 'high',
            'Tags': 'technologist',
            'Icon': 'https://raw.githubusercontent.com/EpitechMouliBot/discord-bot/main/images/epitechmoulibot_logo.png',
            'Title': 'New mouli !',
            'Click': testUrl,
            'Actions': `view, View tests, ${testUrl}, clear=true`,
        },
        body: `${projectName} | ${percentPassed}%`,
    })
}
