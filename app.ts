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

To Improve type safety, we can define the function as a generic function. For that add angular brackets after 
the function name and inside the angular brackets use T as a type place holder. Now we can change the type 
for the input parameter and the returned value to use T instead of any. This is the way to define a generic 
function. 

To further generalize the function, we could therefor add a second type variable that represents one of the 
members of the type T we defined already. But how can we express the constraint that the second type variable 
should be one of the keys of the first? For situations like that TypeScript offers a special keyword keyof. 

keyOf written in front of another type returns a variable that only contain one of the keys of that type 
expressed as a string. In our case, add a key type K within the angular brackets as a second type variable and
constrain it with extends keyof T, meaning that K can only be assigned to one of the property keys of T. 
Then add a key variable with type K as a function input. */

function findMaximum<T, K extends keyof T>(data: T[], key: K) : T {
    let max = data[0]; // Initially set the maximum to the first entry.
    for (let element of data) {
        /* We can't use the "." notation since key is a string. To access the object member, we use square
        brackets. */
        if (element[key] > max[key]) { 
            max = element;
        }
    }
    return max;
}

/* we can Check our case by calling the function with the name of the property to compare. We could use the 
function for any set that has a variable natural ordering. */
console.log(findMaximum(sales, "amount"));