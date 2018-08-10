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

To make variable amount available on type T, we need to constraint the type T, we to accept only types that 
have an amount property. For that define an interface HasAmount and amount as a member. Then state the 
constraint by use of the key word extends within the angular brackets*/

interface HasAmount {
    amount: number
}

function findMaximum<T extends HasAmount>(data: T[]) : T { // For clarity chnage also the parameter name to data
    let max = data[0]; // Initially set the maximum to the first entry.
    for (let element of data) {
        if (element.amount > max.amount) { 
            max = element;
        }
    }
    return max;
}

console.log(findMaximum(sales));
/* The example still works but the function still has a drawback. We can use it only for lists that have the 
amount property and we always assume an authoring of elements by amount. To further generalize the function, 
we could therefor add a second type variable that represents one of the members of the type T we defined 
already. 

But how can we express the constraint that the second type variable should be one of the keys of the first? 
For situations like that TypeScript offers a special keyword keyOf */