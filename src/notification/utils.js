export function is_num(id) {
    return (/^\d+$/.test(id));
}

export function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const formattedDateString = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return (formattedDateString)
}

export function getAdaptiveColor(color) {
    switch (color) {
        case 'green':
            return (0x45ad0e);
        case 'orange':
            return (0xd36410);
        default:
            return (0xdb0f0f);
    }
}
