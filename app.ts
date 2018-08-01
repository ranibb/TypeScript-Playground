// Variable and Constant Declaration

const loginAttemptLimit = 3;
let loginAttempts = 0;

let firstName:string  = "Abdallah";
// let greeting:string = "Hello " + firstName +"!";
let greeting:string = `Hello ${firstName}!`;

console.log(greeting);

let userIsOnline = true;


// Type constructions (Arrays, Tuples and inline object)

let primeNumber = [2,3,5,7,11,13]
console.log(primeNumber);
primeNumber.pop();
console.log(primeNumber);
primeNumber.push(17);
console.log(primeNumber);

let externalUserProfile: [number, string, string] = [1234, "Abdallah", "Abu Sultan"];

let userProfile = {
    userID: 1234,
    firstName: "Abdallah",
    lastName: "Abu Sultan"
}

console.log(userProfile.firstName);


// Custom Type

type exUsPr = [number, string, string];

let externalUserProfile2: exUsPr = [1234, "Abdallah", "Abu Sultan"];

let userProfile2 = {
    userID: 1234,
    firstName: "Abdallah",
    lastName: "Abu Sultan"
}

console.log(userProfile2.firstName);