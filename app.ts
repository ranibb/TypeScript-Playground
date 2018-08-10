/*Assume we deal with sales data whose defined by an interface Sales. */

enum Country {
    US = "United States",
    JP = "Japan",
    CN = "China",
    DE = "Germany"
}

interface Sales {
    country : Country // The country could be a Country code defined by an enumeration.
    amount : number // The amount is of a numeric type.
}

let sales : Sales[] = [
    {
        country : Country.US,
        amount: 35600
    },
    {
        country : Country.JP,
        amount: 48900
    },
    {
        country : Country.CN,
        amount: 8900
    }
]

/* A function that find the maximum sales. It takes salesData as an argument and returns a sales object back 
that represents the sales on a list with maximum amount */
function findMaximum(salesData: Sales[]) : Sales {
    let max = salesData[0]; // Initially set the maximum to the first entry.
    for (let element of salesData) {
        if (element.amount > max.amount) {
            max = element;
        }
    }
    return max;
}

console.log(findMaximum(sales));