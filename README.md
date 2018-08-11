# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Type Assertions and Type Guards

## Type Assertions
Type assertion is a way to explicitly inform the compiler that you want to treat the entity as it would have a different type. This allows you to treat any as a number, or number as a string.

For example, we need a type assertion when we create an object of a hybrid type as we saw in a [previous lesson](https://github.com/ranibb/TypeScriptPlayGround/blob/Interfaces-Advanced-Topics/app.ts#L33).

In general, a type assertion is required when assigning supertype to a subtype but in contrast to the concept of type casting in other programming languages, type assertions are a compile-time feature and have no run-time effects.

    class Superclass {
        ...
    }

    class Subclass extends Superclass {
        ...
    }

    let x : Subclass = new Superclass(...) as Subclass

In this context we need to understand when to use type assertion and when not.

## Type Guards
Unlike the type assertion, a type guard exists at run-time and help us to check the type of a variable. For that TypeScript offers us two operators:

instanceof : With instanceof we check if a variable is an instance of a certain class.

    if(obj instanceof SomeClass) {
        ...
    }

typeof: With typeof we check for the type of primitive variables

    if (typeof text == "string") {
        ...
    }

Moreover, we might define our own custom type guards. For instance, if we use inline type objects.