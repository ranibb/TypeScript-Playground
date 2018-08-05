# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

## Interfaces - Advanced Topics

## Modifiers for Interface Properties
A readonly property can't be changed after the object was created. Whereas an optional parameter is one that can be provided or left out when creating an object.

### Readonly Property

Interface Definition

    interface IName {
        readonly name : string
        ...
    }

Object Initialization (Required!)

    let obj : IName = {
        name : "Jhon"
    }

Later property Assignment (Error)

    obj.name = "...";

### Optional Property

Interface Definition

    interface IName {
        name? : string
        ...
    }

Object Initialization (Optional)

    let obj : IName = {
        ...
    }

Later property Assignment (Optional)

    obj.name = "...";

## Type of Interfaces
In the "Interface - Branch" of this repo we concentrated on the most natural type of an interface. that is the key-value or object type. The interfaces we created Employee and EmployeeList are both of that type. Thus, a variable of the type Employee or EmployeeList is an object and its properties and methods can be accessed by the "." notation. But interfaces are not only capable of describing the object type but also other types, for example, the function type.

### Object (key-value) Type
The variables created with this type are objects that have properties and methods.

    key1 : value
    Key2 : value
    key3 : f()->

### Function Type

    f()->

### Index Type

    [...] : ...

### Hybrid Type

    f()->
    Key1 : value
    key2 : value
