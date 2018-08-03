function greet() {
    console.log("Hello");
}
greet();

//-----------------------------------------------------------------

function greet2(){
    return "Hello";
}
console.log(greet2());

//-----------------------------------------------------------------

function greet3(name : string, newMessagesFrom : string[]) : string {
    return `Hello ${name}! You have ${newMessagesFrom.length} new messages!`;
}
const newMessagesFrom = ["Maram", "Layan", "Omar"];
console.log(greet3("Abdallah", newMessagesFrom));

//-----------------------------------------------------------------

function greet4(name : string, newMessagesFrom : string[]) : string {
    let greeting = "Hello ";
    greeting += name + "! ";
    newMessagesFrom.length
    ? greeting += `You have ${newMessagesFrom.length} new messages!` 
    : "";
    return greeting;
}
console.log(greet4("Abdallah", newMessagesFrom));

/* Optional Parameter
** An optional parameter is written with a “?” mark. Let us say that we want to add
** an optional welcomeText to our greeting. Check that no error is shown when we 
** don't send a value in the function call. Instead the optional value is set to 
** undefined.
*/
function greet5(name : string, newMessagesFrom : string[], welcomeText? : string) : string {
    let greeting = "Hello ";
    greeting += name + "! ";
    newMessagesFrom.length
    ? greeting += `You have ${newMessagesFrom.length} new messages! ` 
    : "";
    welcomeText
    ? greeting += welcomeText
    : "";
    return greeting;
}
console.log(greet5("Abdallah", newMessagesFrom, "Welcome"));

/* Set a default values for a parameter if no value was provided in the function 
** call.
*/
function greet6(name : string, newMessagesFrom : string[], welcomeText :string = "Let enjoy your day!") : string {
    let greeting = "Hello ";
    greeting += name + "! ";
    newMessagesFrom.length
    ? greeting += `You have ${newMessagesFrom.length} new messages! ` 
    : "";
    welcomeText
    ? greeting += welcomeText
    : "";
    return greeting;
}
console.log(greet6("Abdallah", newMessagesFrom));

/* Change the implementation a little bit. We don't want to show the number of 
** messages. Instead list the name of the people who has sent a message, separating
** their names by a "," and separating the last name by "and".
*/
function greet7(name : string, newMessagesFrom : string[], welcomeText :string = "Let enjoy your day!") : string {
    let greeting = "Hello ";
    greeting += name + "! ";
    newMessagesFrom.length
    ? greeting += `You have new messages from: ${list(newMessagesFrom)}! ` 
    : "";
    welcomeText
    ? greeting += welcomeText
    : "";
    return greeting;
}
function list(items: string[]) : string{
    //pop the last element in the array and save it in a constant
    let lastItem = items.pop();
    return items.join(", ") + " and " + lastItem;
}

console.log(greet7("Abdallah", newMessagesFrom));

console.log(newMessagesFrom);
// Push a name back "manually" to the newMessagesFrom array
newMessagesFrom.push("Omer");
console.log(newMessagesFrom);

/* Let us assume we want to use this list function we created above in another 
** context where we don’t have an array. We just want to provide different items 
** directly in a function as different parameters. For that we use a rest parameter!
*/
function list2(...items: string[]) : string{
    const lastItem = items.pop();
    return items.join(", ") + " and " + lastItem; 
}

console.log(list2("A", "B", "C"));

// To push a whole array to an existing array:
let someNames = ["Rayan", "Rakan", "Noha", "Sultan"];
newMessagesFrom.push(...someNames);
console.log(newMessagesFrom);

newMessagesFrom.pop();
newMessagesFrom.pop();
newMessagesFrom.pop();
newMessagesFrom.pop();

console.log("--------------------");

/* You can use the rest operator in another way than function parameters. 
** For example, in constructing and destructing arrays.
*/

// Constructing arrays by rest operator:
let newArray1 = [...newMessagesFrom, ...someNames];
console.log(newArray1);

// Constructing without rest operator (Produces dimensional array):
let newArray2 = [newMessagesFrom, someNames];
console.log(newArray2);

// Destruct an array:
let [firstElement, ...otherElements] = newArray1;
console.log(firstElement);
console.log(otherElements);

/* Keep in mind that the rest operator can only appear at the end of a parameters 
** list. For instance, you can't separate those last elements from the others in 
** the same way. That's why the operator is called rest operator.
*/

// We can create a custom type listOperator for a function
type listOperator = (...items: String[]) => String;

// type listOperator = (...elements: String[]) => String; // works the same if you changed items to elements or whatever.

// Function can be assigned to a variable
let list3 : listOperator= list2; // notice that the list function won't be called because we didn't use brackets after the function name.

console.log(list3("A", "B", "C"));

// Conclusion: A function is also a variable with a type.