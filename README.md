# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

## Exercises
• Write EmployeeList as a Class (Done)

• Make the code generic, so it not only applies for employee data but any type of data (Done).

    Make the code generic so the implemented filtering functionality could be used for any type of data, 
    not just data of the Employee type. The interface EmployeeFilter and the class EmployeeList are 
    confined to use with Employee data as defined in the Employee interface. When changing EmployeeList 
    class into a generic List class, you might wonder what to do with the managerFilter method which 
    doesn't obviously make sense in a different context.

• Remove the method managerFilter from the Class and provide a generic function singleValueFilter

• Allow multiple filters to be supplied in the applyFilter method

• Get employee data by asynchronous and put the employee data service in a separate module