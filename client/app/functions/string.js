export function GetZero(id) {
    let finalResult

    if (id > 4) {
        id = id.substring(0, 3)
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