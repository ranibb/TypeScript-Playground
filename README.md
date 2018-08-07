# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Interfaces

In TypeScript we use interfaces to define the type of more complex structures specially of the object type.

Unlike classes which can create objects, interfaces have no runtime effect. You can check by running the TypeScript compiler `tsc`. In the generated JavaScript we see that the interface has disappeared. Since interfaces just describe types and JavaScript is not a type language, this is no surprise.

## Declaring and using interfaces

A typical case where we use interfaces is to type the data that we retrieve from a database table. The properties of our object interface correspond to the columns in the database table.

    interface Employee {
        employeeID : number
        department: string
        managementPosition: Boolean
        workExperience: number
        gender: string
    }

## Type compatibility in TypeScript
In our case, what kinds of objects can we push to the employee array?
* As observed we can push objects that have the exact same structure (same properties and types) that is defined in the interface. Therefore, it is not necessary to explicitly define object as of an interface type. This behavior is acceptable because TypeScript is based on structural typing (The structure determines the type), unlike languages such as JAVA or C++ which are based on nominal typing (The name determines the type). An interface in TypeScript is a blue print for some structure that helps in the efficient development of safe and readable code.
* We can't change the name of the property or leave it out without a value or change its type.

Can we add objects that have additional properties?
if you add one or more property, we obviously don't get an error! So, the basic rule for compatibility is that a variable x can be assigned to the variable y if x has at least all members required type of y.

## Interface Extensions
We could define a Manager interface based on the Employee interface with additional properties that apply to Managers.

    interface Manager extends Employee {
        managementLevel : number
    }

The manager interface contains all the members of the Employee interface plus new members defined in the Manager interface.

So, interface extensions help us to organize our interfaces in a reusable way and it should be noted that an interface can extend multiple other interfaces.

## Interfaces vs. Custom Types: Similarities and Differences
* Interfaces has the advantage of code auto completion.
* Interfaces has the advantage of better reusability, they can be extended by other interfaces and implemented classes.
* You should use custom types only for types that can't be defined by interfaces.