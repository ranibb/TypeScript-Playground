# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Classes

Classes are not just blue prints to define a type of object but also has the capability to create the object of a specific type.

It is important to understand that a class type has two sides: The Instance Type and the Static Side. The instance members are members that are called from class instances! from the objects created by the class. In our case, the coordinates and the distance method.

Whereas static members are called by the class itself. For example, the constructor function used by the class to create new instances.

## What is a class and how to declare and use them to create Objects?

    class CName {
        property: string
        constructor(prop: string) {
            this.property = prop;
        }
        ...
    }

Classes encapsulate the data and functionality needed to create objects of a particular type.

The constructor function is a special static member, called by an instance when created and it is supposed to initialize the instance properties. However, it is not strictly required to provide a constructor function. In such a case TypeScript sets all properties to undefined that they are not yet initialized.

In our case, the initialization is trivial since we just copy the parameter values into instance property variables with the same name. In a scenario like that TypeScript offers a shortcut. Leave out the property declaration and assignment and instead add explicit access modifiers in the parameters list of the constructor indicating that we understand these variables not just as properties of the constructor function but as an instance properties’. In our case, we add the keyword "Public" which means that the instance variables should be accessible and modifiable from each instance with the "." notation.

## The two sides of the Class Type: Static Type vs. Instance Type

The Instance Type: is a type of the objects that are created by the class.

The Static Type: All the general data and functionality is contained that is needed to create individual objects that independent of individual objects data.

As a logical consequence the most important element of the static type is a class constructor. That is a function used by the class to create objects of the instance type.

In each case where a new object is created from the particular type the class constructor is called to initialize the object  

    const cInstance = new CName("...")

## Classes vs. Interfaces

* Interfaces define just the shape of an objects whereas classes define the shape and contains the functionality to create objects of that shape.
* In cases where we just want to provide type for the data we receive from external data source we prefer interfaces.
* In case we need some runtime functionality we need classes since interfaces only exist at compile time.
* Classes allow us to use object orientated programming techniques like inheritance.

## Remark
If you deal with complex objects and try to create new objects by the copy and change method, beachful. for instance, if you store the homePosition to another variable and change a coordinate and then look what happened to homePosition, you will not that it also changed the home position. The reason is that complex types like objects or arrays are passed by reference not by value. Only the primitive types are passed by value.