enum Country {
    US = "United States",
    JP = "Japan",
    CN = "China",
    DE = "Germany"
}

/* Define our own comparable interface that can be implemented by a Sales class. The interface has a compareTo 
method that takes an item and returns a number. Think 1 for greater and -1 for smaller and equal. This method 
compares the object itself with another object of the same type. The object type could be anything, so we 
create a generic interface with a type placeholder <T> and define the item type in the method as T. */
interface Comparable<T> {
    compareTo(item:T) : number
}

/* Define a Sales class that implements the comparable interface of type Sales with a constructor that takes 
country and amount to reflect our simple example. And add a compareTo method that compares to another Sales
object. By implementing the interface, we show that our class can compare its instances and define how they 
should be compared.
*/
class Sales implements Comparable<Sales> {
    constructor(private country: Country, private amount: number) {}
    compareTo(item: Sales) : number {
        /* Return 1 in case our current instance referred by the keyword this has a greater amount than the 
        item we compare to */
        if (this.amount > item.amount) {
            return 1;
        } 
        else {
            return -1;
        }
    }
}

let sales : Sales[] = [
    /* Instead of writing inline objects, we can use the class to initialize them. Each class object is 
    initialized by the keyword new as a class instance. */
    new Sales(Country.US, 35600), 
    new Sales(Country.JP, 48900), 
    new Sales(Country.CN, 8900)
]

/* The function now works with type T that extends comparable interface for type T. */
function findMaximum<T extends Comparable<T>>(data: T[]) : T {
    let max = data[0]; // Initially set the maximum to the first entry.
    for (let element of data) {
        /* Write the comparison of each element to the max element by use of the compareTo method */
        if (element.compareTo(max) == 1) { 
            max = element;
        }
    }
    return max;
}

console.log(findMaximum(sales));