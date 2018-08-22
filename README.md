# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

## Exercises
• Write EmployeeList as a Class (Done)

• Make the code generic, so it not only applies for employee data but any type of data (Done).

Make the code generic so the implemented filtering functionality could be used for any type of data, not just data of the Employee type. The interface EmployeeFilter and the class EmployeeList are confined to use with Employee data as defined in the Employee interface. When changing EmployeeList class into a generic List class, you might wonder what to do with the managerFilter method which doesn't obviously make sense in a different context.

• Remove the method manager Filter from the Class and provide a generic function singleValueFilter

Write a generic function singleValueFilter which returns a generic filter. A singleValueFilter is a filter that selects element by the condition that a single attribute matches a single value, like in our case of the manager filter where we selected employees where the attribute managementPosition has a value of true.

Take care to define the parameters for the attribute and the value which we will need in the generic function in a type-Safeway. So, don't use a type any. When done, test the function by generating two different Employee filters and apply them on the Employee data.

• Allow multiple filters to be supplied in the applyFilter method

At the end of the last exercise, we created two filters and applied each filter to test our generic function singleValueFilter. Now what about a combination of filters? How to change the code to enable filtering the Employee data with multiple filters which are then applied simultaneously?

• Get employee data by asynchronous and put the employee data service in a separate module

Use asynchronous programming to retrieve Employee data and to put the Employee data service within a separate module. To make that more precise, first write an asynchronous function which returns the Employee data after simulated delay of 2 seconds, when done, observe that it’s impossible to use the return of this function in the constructor of the class, since a class constructor can't create a promise of the instance but only the instance itself. So, you will have to write a sperate factory method returning a promise of a list and use this factory method to create a promise of an Employee list. And finally, move the asynchronous function providing the Employee data into a separate module; employeeService.