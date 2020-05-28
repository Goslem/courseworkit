module.exports.response = (statusCode, data = null) => ({
    statusCode: statusCode,
    data: data,
})

module.exports.isNumber = (...args) => {
    for (let arg of args) {
        if (isNaN(Number(arg))) {
            return false
        }
    }
    return true
}

module.exports.isEmptyString = (...args) => {
    for (let arg of args) {
        if (!arg) {
            return true
        }
    }
    return false
}
