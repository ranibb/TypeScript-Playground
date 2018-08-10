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
that represents the sales on a list with maximum amount.

In a first step we can try to make this code generic for all arbitrary types so we can find maximum entries 
not just for sales but any other data we put inside. One possible solution would be to replace a type by any. */

function findMaximum(data: any[]) : any { // For clarity chnage also the parameter name to data
    let max = data[0]; // Initially set the maximum to the first entry.
    for (let element of data) {
        if (element.amount > max.amount) {
            max = element;
        }
    }
    return max;
}

console.log(findMaximum(sales));
/* The example still works but we lose all type safety. Independent of what you put inside we always get back 
an object of type any. */