# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Classes

Classes are not just blue prints to define a type of object but also has the capability to creat the object of a specific type.

## What is a class and how to declare and use them to create Objects?

    class CName {
        property: string
        constructor(prop: string) {
            this.property = prop;
        }
        ...
    }

Classes encapsulate the data and functionality needed to create objects of a particular type.


## The two sides of the Class Type: Static Type vs. Instance Type

The Instance Type: is a type of the objects that are created by the class.

The Static Type: All the general data and functionality is contained that is needed to create individual objects that independent of individual objects data.

As a logical consequence the most important element of the static type is a class constructor. That is a function used by the class to create objects of the instance type.

In each case where a new object is created from the particular type the class constructor is called to initialize the object  

    const cInstance = new CName("...")

## Classes vs. Interfaces

Interfaces define just the shape of an objects whereas classes define the shape and contains the functionality to create objects of that shape.
