export function getPercentColor(percentPassed) {
    try {
        if (typeof(percentPassed) !== int)
            percentPassed = parseInt(percentPassed);
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
