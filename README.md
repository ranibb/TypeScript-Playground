# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Functions as Variables

Functions are variables with a type function, the consequence is that functions can be used every where were we can use variables. The elements of an array can be functions. Functions can take other functions as parameter input and also can return function back as a return value.

We can also use functions as properties in objects, in this context they are called object methods. Functions that are defined within an object sometimes want to use other object properties. To do that from inside the object we reference the object itself by the keyword “this”. However, in some certain conditions we run into an error if we do that.

Function as parameter

    f( f(...)-> )->

Function as returned value

    f( )-> f(...)->

As objects methods (relevance of the keyword this)

    obj {
        prop: x
        ...
        method: f(...)->
    }

# Arrow Functions use scenarios/benefits

## Preserve the (enclosing) context of the function at creation time.
* Use a standard function when you want a dynamic “this” reference that refers to the object context at calling time.
* Use an arrow function syntax if you want a static object context where “this” preserves its reference from the context at creation time.

## Often used as callbacks / completion handlers passed in to other functions
let’s assume we want to retrieve data from a database, process the data and send to the client. If the database request takes a little for that time it will block our server so it can't handle other requests from the client. To avoid that we use asynchronous programming. What we intend is to avoid blocking the server by the time the database request is done, so we send our request to the database and with our request we send also a function that is supposed to be executed after the database request is finished. This function is called callbacks or completion handler. The database service puts the request on a separate thread so it doesn’t block our main code and after this task is finished it calls the completion handler that runs a processing of the data as defined in the function handed over to the database service. obviously, the completion handler is a function which is defined not in the same context than it is called later so it is a place where you should see arrow function syntax to avoid problems with the reference of “this”.

## Simple way to define a distribute functions (especially when passed in as arguments)

It could be an advantage to use the arrow function syntax since it is more convenient to write specially when defining a function on the fly to use its parameters for other function. A function that is defined without a name is called an anonymous function.

    setTimeout( () => {console.log("Hello!")}, 5000 );

In a case where the function body consists of only one line, we can remove out the curly braces:

    setTimeout( () => console.log("Hello!"), 5000 );


