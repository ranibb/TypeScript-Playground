# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Classes and Object Oriented Design

We focus on two main object orientated programming concepts: Data encapsulation and inheritance.

## Data Encapsulation by use of Access Control on Class members

We could access all class members from outside without restrictions. However, in many cases this is not what we want. For some variables we may want to prevent access from outside or at least we want to grant readonly access. To control access to the class members we have two basic strategies: Either we use access modifiers or alternatively Getter and Setter methods.

### public/private/protected modifiers (access modifiers strategy)
* If you don't use any access modifiers, TypeScript assumes public as default. That means the members can be freely accessed and modified from outside the class with the "." notation.
* In order to prevent any access from outside the class we have to explicitly add the modifier private in front of the property.
* And if you want to allow access from sub classes that inherit from our class but no access from outside we use the protected keyword.

### readonly modifier (access modifiers strategy)
* In case we want to allow only read access from outside that prevent modification, we use the modifier readonly.

### Getter and Setter functions (Getter and Setter methods startegy)
* To allow more fine grain control over member access we use Getter and Setter methods.
* When using Getters and Setters, you first set all your members variables to private and that provide specific methods to read this data with a getter and modify the data by our setter.

## Class Inheritance for building class hierarchies

### Understanding Inheritance

### Abstract Classes as base classes in class hierarchies that can't be instantiated them selves

