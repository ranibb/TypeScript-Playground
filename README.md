# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Enumerations

Basically, an Enumeration is a collection of constants that logically belong together and define such a type of a categorical variable that can take on a value from predefined set of admissible values. For instance, a person agenda, academic title or occupation could be of a type defined by Enumeration.

## Types of Enumerations

### Numeric Enumerations (Run-Time)
by default, an enum is interpreted as a numeric enum staring with 0 for the first entry, 1 for the next and so on. If you want to change the numbers, let us say to 1,2,3,4 and 5, we can assign these values ourselves, note in such a case where we only want to change the start value and count up from there, setting just the start value is enough.

    enum TaskStatus {
        notStarted = 1,
        inProgress,
        finished
    }

### String Enumerations (Run-Time)
Unlink the numeric enums, string enums don't have the auto increment behavior. Consequently, we have to assign each numeration case explicitly. One difference between numeric and string enumerations is that auto completion is not available for string enums.

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

When we need some Run-Time functionality like lookup or reversed lookup we don't use constant. However, if you just need a Compile-Time support of an enumeration, it is ok to declare the enum constant and it’s also more efficient.

## Working with Enumerations

### Enumeration as a one-to-one mapping
We will see that an Enumeration can be viewed as a one-to-one correspondent and you will learn how a Lookup and a reversed lookup is done in case of non-constant Enumerations.

The term constant and non-constant are not self-explanatory in case of an enum. The best way to find out about the difference between enum's declared constant and other enums is to run the TypeScript complier and compare the difference in a transpiled JavaScript. For any non-constant enum a lookup object is created, that maps the enum members to the raw values and that can be used at Run-Time for lookups or eventually revered lookups.

If you run the TypeScript complier and compare the JavaScript constructs of the Numeric enum to string enum, we should notice a slight difference. In case of the numeric enums, a one-to-one mapping is implemented that allow lookups and revers lookups. However, in case of the string enum, just a lookup is available.

### Evaluation of Enumeration with switch
We will study the typical case where an Enumeration is used together with a switch statement to distinguish the cases predefined by the enumeration.