# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Generics
The main idea of Generics is Code Reusability, Generics enable us to write code that works over a range of types instead of just a single type. So, whenever we want to build a component that work for various types, and the data types are used in different places within the component, we should use generics.

Some Functions defined for different Types

    f(string[]) -> string

    f(number[]) -> number

    f(object[]) -> object

Generic Function

    f<T>(T[]) -> T

## Generic Components
We can use Generics in all the key structure sets we talked about so far: Functions, Interfaces and Classes. In all of these cases we create a generic version by adding the type variables we want to use behind the name of the function, interface or class in angular brackets. In the body we then use these type variables like types. And when we call or instantiate the function, interface or class we put within the angular brackets the concrete type we want to use instead of the type variable. So, for instance, in one situation we could call a function over a number type and in another situation, we could call the same function over a string type. In many cases we also can rely on type inference since TypeScript often finds out itself which type to use when creating an object. Take the built-in array type as an example, we can define an array of numbers, strings, objects or any other type in the same way.

Generic Function

    function reverse<T> (list : T[]) : T[] {
        // Return List in reverse ordering
    }

Generic Interfaces

    interface Equitable<T> {
        equalsTo(item : T) : Boolean
    }

Generic Classes

    class Stack<T> {
        items : T[]
        push(item : T) {...}
        pop() : T {...}
    }

## Variations of Generic Type Parameters
We will also see cases where we want to make our component generic in more than one type variable. A dictionary with arbitrary key type and element type could be an example here. In such a case we declare two variables within the angular brackets separated by a comma. Often, we also need to put constraints on generic types, for that we define an interface containing the specific requirements and add an extends statement after the type variable indicating that we only accept types that extend or implement the interface. This way we make sure that only types and certain members can be used in the component.

Multiple Generic Type Parameters

    class Dictionary<k,T> {
        ...
    }

Putting constraints to Generic Types

    function find<T extends Equitable<T>>(list : T[]) : number {
        ...
    }