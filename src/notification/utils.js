export function is_num(id) {
    return (/^\d+$/.test(id));
}

export function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
