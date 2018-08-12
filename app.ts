/* For our discussion about the array methods every/some, map and reduce we start with a numeric simple array */

const list = [1,2,7];

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