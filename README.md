# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Enumerations

Basically, an Enumeration is a collection of constants that logically belong together and define such a type of a categorical variable that can take on a value from predefined set of admissible values. For instance, a person agenda, academic title or occupation could be of a type defined by Enumeration.

## Types of Enumerations

### Numeric Enumerations (Run-Time)

    enum TaskStatus {
        notStarted = 1,
        inProgress,
        finished
    }

### String Enumerations (Run-Time)

    enum Department {
        IT = "IT Department",
        sales = "Sales Department",
        management = "Management"
    }

### Constant Enumerations (Compile-Time)

    const enum AgeGroup {
        under20 = 1,
        between20And30,
        between30And40,
        ....
    }

Enumerations have a different behavior when they are defined as constants. A constant enumeration exists only at compile time and replaced by its raw values in run time. Whereas other enumerations are run time constructs and allow run time functionality.

## Working with Enumerations

### Enumeration as a one-to-one mapping
We will see that an Enumeration can be viewed as a one-to-one correspondent and you will learn how a Lookup as reversed lookup is done in case of non-constant Enumerations 

### Evaluation of Enumeration with switch
we will study the typical case where an Enumeration is used together with a switch statement to distinguish the cases predefined by the enumeration.