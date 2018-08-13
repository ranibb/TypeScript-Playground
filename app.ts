/* For our discussion about the array methods every/some, map and reduce we start with a numeric simple array */

const list = [-1,3,7];

/* How can we check whether the array contains for example only positive entries. Instead of doing that 
manually by a loop, we will use the array method "every". If you hover over the every you get a preview with 
the method definition. The method every request a call back function and returns a Boolean. The call back it 
self takes up to 3 parameters and returns a Boolean too. In a simplest case the call back takes only a value 
of type number which is a type of our array elements and returns true or false. */
list.every

/* We could define a function isPositive which map values to true only if the value is greater the zero. */
function isPositive(n: number) : boolean {
    return(n > 0);
}

/* And we use this function as call back for the array method. So, the every method returns true only if the
call back function returns true for all the entries. */
console.log(list.every(isPositive));

/* However, remember that we have a much shorter way to state the same. Instead of defining the call back 
function separately, we could use the arrow function syntax inline. Since a call back function contains just 
a return statement we even can leave out the return keyword and the curly braces */
console.log(list.every((value) => value > 0));

/* The method some has the same syntx as every but returns true if one of the entries is true */
console.log(list.some((value) => value > 0));

/* The map method maps each element according to a call back function we have to provide and returns an array 
of generic type. The type of the return array depends on the return type of our call back function. Say if the 
call back function returns a string; the returned array will be a string array. For a simple example, define a 
new list by mapping the original list with a call back function that just increments a number by 1 */
let newList = list.map((value) => value = value + 1);
/* As a result, we get back an array which contains all the original number incremented by 1 */
console.log(newList);

/* Unlike the method map, the method reduce returns not an array but a single value of the array's element 
type, in our case a number. To understand how reduce works, lets compute the sum of all entries by help of the 
method. The call back function takes a previous value and a current value and returns its sum. The 
currentValue is a current element in the original array but the previousValue is not a previous element in the 
array but an accumulator variable. The logic of the reduce method is as follows: it starts with an initial 
value of zero for the previous element and adds the first element from the array due to the call back 
function. The result from the first step is then stored in the previous value and the second step this value 
is added to the second element and so on. After iterating through the array, we should get back the sum of 
the entries. */
let total = list.reduce((previousValue, currentValue) => previousValue + currentValue);
console.log(total);

/* Whereas an array is an ordered list, a Set is unordered and doesn't allow repetition of elements. Let’s try 
the authors of a book as a set. The set type is a generic type so we add the element type in angular brackets 
in a type definition. A new Set is initialized as a class instance and a class constructor might be called 
within an array as parameter, which contains the initial values to be added to the set. */
let authors : Set<string> = new Set(["Johnson", "Johnson", "Meyers", "Irwin"]);
console.log(authors);
/* Observe that repeated elements are ignored in the set since it doesn't allow repetition of elements. */

/* Write an intersection function, taking a sequence of Sets as input and returning the intersection of the 
Sets which is a Set of elements contained in all the input Sets.
The function should be defined as a generic function with member type T and takes a sequence of sets as 
parameter which might be defined as a rest parameter for convenience. And the function will return a Set of 
member type T. */
function intersection<T> (...sets: Set<T>[]) : Set<T> {
    /* Create a new empty Set. */
    let intersection = new Set<T>();
    /* Iterate through all the members of the first Set provided as function input. We only want to add a 
    member to the intersection if that member is contained in all other Sets too. To express this condition 
    apply every method and to check whether the value is contained in a Set or not use the method has. */
    sets[0].forEach((value) => {
        if(sets.every((set) => set.has(value))) {
            /* In case the member is contained in all the Sets, it is added to the intersection set. */
            intersection.add(value);
        }
    })
    return intersection;
}

let authors2 : Set<string> = new Set(["Johnson", "Meyers", "Irwin"]);

console.log(intersection(authors, authors2, new Set(["Johnson", "Irwin"])));