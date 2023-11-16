export function is_num(id) {
    return (/^\d+$/.test(id));
}

export function getPercentColor(percentPassed) {
    try {
        if (is_num(percentPassed) === false)
            return 'white';
        if (percentPassed > 75) {
            return 'green';
        } else if (percentPassed > 25) {
            return 'orange';
        }
        return 'red';
    } catch (error) {
        return 'white';
    }
}

export function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
