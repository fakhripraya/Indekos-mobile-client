export function GetZero(id) {
    let finalResult;

    if (id > 9999) {
        id = id.toString().substring(0, 3)
    }

    if (id < 10) {
        finalResult = '000' + id
    } else if (id < 100) {
        finalResult = '00' + id
    } else if (id < 1000) {
        finalResult = '0' + id
    } else {
        finalResult = id
    }

    return finalResult
}

export function ParseTime({ time }) {
    let parsedTime;

    parsedTime = new Date(time)
    parsedTime = parsedTime.toLocaleTimeString()

    return parsedTime
}