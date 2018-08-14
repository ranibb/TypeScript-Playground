/* For an example we will use the standard Node module fs which contains functions for reading and writing 
files to the local file system. To make the module available we import it into our program with an import 
statement. This makes a standard node module fs available in our program under the name fs. So, if you type 
fs followed by a dot we get a list of all the members included in that package. In this lesson we will need 
two methods readFileSync and readFile for reading files in asynchronous respectively as synchronous way. */
import * as fs from "fs";

/* We start with the synchronous function to read a string from a file located in the project root folder. 
let’s call the function stringFromFile. Supply file name as parameter and get a string back as returned value. 
For the implementation apply the method readFileSync with the file name as parameter and store the returned 
value from this function in a constant data variable. Hovering over data we observe that it is of type buffer. 
A buffer is a temporary storage used for transfering data and can be converted to a string by the help of the 
method toString. This method takes a string encoding as an argument. Here we assume UTF8 as encoding. For 
error handling, we have the good old try catch, so we will rip our code in a try block and add a catch 
block for error handling. */
function stringFromFile(filename: string) : string {
    try {
        const data = fs.readFileSync(filename);
        return data.toString("UTF8");
    } catch (error) {
        console.log(error);
        return "";
    }
}

/* use the function stringFromFile with "input.txt" which is located in the root directory as argument */
console.log(stringFromFile("input.txt"));

/* Next lets try to do the same in an asynchronous way. Notice the difference between the two functions 
readFileSync() and readFile(). The readFile() doesn't return a value but takes a callback function as second 
input and provides the data read from the file as a parameter in a callback. So, define the callback inline 
by an arrow function with parameters error and data. And within the callback function first handle the 
error case and then convert the buffer into a string as like before. However, since we are inside the 
callback function we have a problem to return the value in the outer function. The best solution here is to 
recognize that the outer function becomes also an asynchronous function and therefore should be written as such 
a function that is without a return value but with a callback as last parameter that specifies what to do with 
the resulting string. For that we don't need a returned value from the function stringFromFileAsync, instead 
add a callback function that takes a string value and returns nothing (void). In the callback for readFile 
function as a last step after converting the buffer into a string invoke the callback function we just 
defined with a string value as parameter. */
function stringFromFileAsync(filename: string, callabck: (data: string) => void) {
    fs.readFile(filename, (error, data) => {
        if(error) {

        }
        let content = data.toString("UTF8");
        callabck(content)
    })
}

/* To test the asyncronus function, provide "input.txt" as a first parameter and a call back wrtitten as an 
arrow function as a second parameter. In our case, we just log the resulting data to the console. */
stringFromFileAsync("input.txt", (data) => console.log(data));