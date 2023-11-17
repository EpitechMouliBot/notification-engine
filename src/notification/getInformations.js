export function calculateSkillsPercent(skills) {
    let count = 0;
    let passed = 0;
    let percents = 0.0;
    for (let i = 0; i < Object.keys(skills).length; i++) {
        count += Object.values(skills)[i]['count'];
        passed += Object.values(skills)[i]['passed'];
    }
    percents = passed * 100 / count;
    return (percents.toFixed(2));
}

export function getCompleteUrl(testCode, testSlug, testRunId, year) {
    return `https://my.epitech.eu/index.html#d/${year}/${testCode}/${testSlug}/${testRunId}`;
}

export function getCompleteStatus(externalItems, separator) {
    let status = '';

    for (let i = 0; i < externalItems.length; i++) {
        const node = externalItems[i];
        switch (node['type']) {
            case 'make-error':
                status += 'Build error\n';
                break;
            case 'coding-style-fail':
                status += `Too many style errors${separator}`;
                break;
            case 'banned':
                status += `Banned function used${separator}`;
                break;
            case 'crash':
                status += `Crash${separator}`;
                break;
            case 'delivery-error':
                status += `Delivery error${separator}`;
                break;
            case 'no-test-passed':
                status += `No tests passed${separator}`;
                break;
            default:
                break;
        }
    }
    if (status.length < 1)
        status = `Prerequisites met`;
    return (status);
}

export function getCompleteNorme(externalItems, separator) {
    let norme = `[-] Major${separator}[--] Minor${separator}[---] Info`;

    for (let i = 0; i < externalItems.length; i++) {
        const node = externalItems[i];
        switch (node['type']) {
            case 'lint.major':
                norme = norme.replace('-', node['value']);
                break;
            case 'lint.minor':
                norme = norme.replace('--', node['value']);
                break;
            case 'lint.info':
                norme = norme.replace('---', node['value']);
                break;
            default:
                break;
        }
    }
    return (norme);
}

export function getPercentColor(percentPassed) {
    try {
        if (percentPassed > 75)
            return 'green';
        if (percentPassed > 25)
            return 'orange';
        return 'red';
    } catch (error) {
        return 'white';
    }
}
