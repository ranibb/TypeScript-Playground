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

/* Declare a class orderedList as a generic class with element type T implementing 
the comparable interface. In the constructor add a data of an array type over T as a
private property. */
class orderedList<T extends Comparable<T>> {
    constructor(private data: T[]) {}
    // An instance method that returns a T element.
    maxItem() : T {
        /* Initially set the maximum to the first entry. And add the keyword this 
        in front of data since data now is a property of the orderedList */
        let max = this.data[0]; 
        for (let element of this.data) {
            /* Write the comparison of each element to the max element by use of the 
            compareTo method */
            if (element.compareTo(max) == 1) { 
                max = element;
            }
        }
        return max;
    }
}

/* To define a sales list as an orderedList, we instantiate the generic class with the 
keyword new */
const salesList = new orderedList<Sales>(sales);

/* Finally, we log the max item of the sales list to the console. */
console.log(salesList.maxItem());