export function CurrencyPrefix(currency) {

    var prefix = ""

    if (currency.toUpperCase() === "RUPIAH")
        prefix = "Rp."

    return prefix
}

export function CurrencyFormat(prefix, number) {
    let result = "";
    let strNumber = String(number)

    for (i = 1; i - 1 < strNumber.length; i++) {
        if (i === 1) {
            result = strNumber.charAt(0) + "."
        } else {
            if ((i - 1) === 3) {
                result = result + strNumber.charAt(i - 1) + "."
            } else {
                result = result + strNumber.charAt(i - 1)
            }
        }
    }

    if (number === 0)
        return "Rp." + 0
    else
        return prefix + result

}