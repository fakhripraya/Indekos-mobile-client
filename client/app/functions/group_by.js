export const groupBy = (key, arr) => arr
    .reduce(
        (cache, product) => {
            const property = product[key]
            if (property in cache) {
                return { ...cache, [property]: cache[property].concat(product) }
            }
            return { ...cache, [property]: [product] }
        }, {}
    )