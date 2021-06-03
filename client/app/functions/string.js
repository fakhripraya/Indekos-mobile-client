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

export function ParseTimeGolang({ time }) {
    let parsedTime;

    parsedTime = new Date(time)

    var hours = parsedTime.getHours() + 7;
    var minutes = parsedTime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export function ParseTime({ time }) {
    let parsedTime;

    parsedTime = new Date(time)

    var hours = parsedTime.getHours();
    var minutes = parsedTime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}