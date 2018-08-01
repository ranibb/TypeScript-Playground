let score = 90;

if (score >= 60) {
    console.log("Pass");
}  else {
    console.log("Fail");
}

// Comparison operator: <=, >, <, == !=
// Logical operator: &&, ||, !
// If a string is emplty it is interpreted as false. Otherwise is true.
// A number is false in case of 0. Otherwise is true.
// Null and undefined are interpreted as false.

// if...else with ternary operator
score >= 60 ? console.log("Pass") : console.log("Fail");

// if...else if...else
if (score >= 80) {
    console.log("Excellent");
}  else if (score >= 60) {
    console.log("pass");
} else {
    console.log("Fail"); 
}

// switch
let grade = "B"
switch(grade) {
    case "A": 
        console.log("Excellent");
        break;
    case "B": 
        console.log("Very Good");
        break;
    case "C": 
        console.log("Good");
        break;
    case "D": 
        console.log("Pass");
        break;
    case "F": 
        console.log("Fail");
        break;
    default: 
        console.log("Other");
}

// Suppose we only want to send 3 messages: "You did excellent" to the people who got A, "You Failed" to the ones who have F and "You Passed" to B,C and D.
let grade2 = "B"
switch(grade2) {
    case "A": 
        console.log("You did Excellent");
        break;
    case "B": 
    case "C": 
    case "D": 
        console.log("You Passed");
        break;
    case "F": 
        console.log("Fail");
        break;
    default: 
        console.log("You Failed");
}

// Example: Computing Factorials. The factorial of an integer n is a mathematical product of all integers from 1 to n. For instance, a factorial of 4 = 1*2*3*4 = 24.
const n = 4;
let factorial = 1;
for (let i = 2; i <= n; i++) {
    factorial = factorial * i;
    // factorial *= i; // short notation
}
console.log("Factorial of 4 = " + factorial);

let i = 2;
factorial = 1;
while (i <= n) {
    factorial *= i;
    i++
}
console.log("Factorial of 4 = " + factorial);

i = 2;
factorial = 1;
do {
    factorial *= i;
    i++;
} while (i <= n)
console.log("Factorial of 4 = " + factorial);

// In loops we can use two additional statements: break and continue. whereas "break" leaves the whole loop and "continue" skips the current iteration returning to the loop control to check for the condition again and if it is true run to the next iteration.

// How to iterate through arrays
const excellentStudents = ["Maram", "Abdallah", "Layan", "Omar"];

for (let key in excellentStudents) {
    console.log(`Hello ${key} - ${excellentStudents[key]}! You did excellent!`);
}

for (let value of excellentStudents) {
    console.log(`Hello ${value}! You did excellent!`);
}

// In case we don't want to repeat the same statement for every one on a new line. Instead we want one statement concatenating the names with a "comma" or with "and"
let greeting = "Hello "; // Initial greeting
for (let key in excellentStudents) { // Loop through the array’s index

    greeting = greeting + excellentStudents[key]; // In all cases we concatenate the name

    switch(Number(key)) { // What more to add in each case? a "comma" or "and"? This is decided on bases of the index
        case excellentStudents.length - 1: // In case of the last element in the array
            greeting += "! you did excellent" // finish the greeting text and break
            break;
        case excellentStudents.length - 2: // In case of the 2nd last element
            greeting += " and " // Add "and" to the greeting text and break
            break;
        default: //In case of other elements
            greeting += ", " // Add the "comma"
    }   
}

console.log(greeting);

// Note that not just array type can be iretate it like that but all types that are iterable. A string for example, iterat with characters. Sets and maps are also iterable.

// In case we want the numerical index as well as the entry. Another option is to use a specific array method called forEach. The above code is seplified to this:
greeting = "Hello ";
excellentStudents.forEach((name,index) => { // The forEach method takes a function as a parameter. The function has 2 inputs.

    greeting = greeting + name; 

    switch(index) { 
        case excellentStudents.length - 1:
            greeting += "! you did excellent"
            break;
        case excellentStudents.length - 2:
            greeting += " and "
            break;
        default:
            greeting += ", "
    }  
});

console.log(greeting);