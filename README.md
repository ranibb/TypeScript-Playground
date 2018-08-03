# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Functions and Function Types
* Functions help us to organize our program in small building blocks, making our code more readable and maintainable.
* Functions serve as logical components that can use reused in different parts of our program.

## Defining and calling functions

    // Function Defenition
    function f(param) {
        ...
        return y
    }

    // Function Call
    f(someValue)

## Using function parameters

### Function Parameters (with annotated Types)

    function f (parameterA, parameterB) {...}

### Optional Parameter

    function f(parameter?) {...}

### Default values for parameters

    function f(parameter = value) {...}

### Rest Parameter

    function f(...parameter : Type[]) {...}

## Inferred type of functions and typing functions explicitly

### Writing a function type explicitly

    function f(param : string) : number {...}

### Define a custom function types

(custom) Function Type

    type CustomF = (param : string) => number

Function as variable with function type

    let f : CustomF = function (param) {...}

