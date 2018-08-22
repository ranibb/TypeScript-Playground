/* 
Starting with the code from Interfaces-Advanced-Topics branch we are going to do the following: 
• Write EmployeeList as a Class (Done)
• Make the code generic, so it not only applies for employee data but any type of data (Done)
• Remove the method manager Filter from the Class and provide a generic function singleValueFilter (Done)
• Allow multiple filters to be supplied in the applyFilter method (Done)
• Get employee data by asynchronous and put the employee data service in a separate module
*/

import { Employee, getEmployeeData } from './employeeService'

/* Rename the interface and add a generic type varaible T within angular brackets which represents the 
data the filter is working on. */
interface Filter<T> {
    /* A filter of for data of type T is a function which maps data of type T to true or false. */
    (e: T) : boolean //fixed
}

/* Rename the class to List and add a generic type varibale T within angular brackets. In a generic 
version, the class List over type T inherest from an array of type T. Also replace the Employee type by 
T in the rest of the code. */
class List<T> extends Array<T>{

    /* The class constructor is responsible to initialize a List by data in form of an array */
    constructor(data: T[]) {
        /* Within the constructor, call the super class and provide the data as parameter for 
        the super class constructor. Note the different ways to initialize an array; In our case, we 
        choose the option to initialize with data provided as a rest parameter. So, we add a reset 
        operator "..." in front of the initial data supplied as our own constructor parameter to covert 
        the array into a list. */
        super(...data);
    }
    /* We have to add a factory method to the List class which creates a promise of a list. So, we 
    define a static method CreateAsync that takes a promise of an array of type T as input and returns 
    a promise of a List of type T */
    static CreateAsync<T>(data: Promise<T[]>) : Promise<List<T>> {
        /* We define a new Promise as usuall. */
        return new Promise ((resolve, reject) => {
            /* And in a success case we wait until the data promised as input resolves and "then" we 
            resolve our own promise with a List object that we create by calling the constructor function 
            with the resolved input data as parameter. */
            data.then((data) => {
                resolve(new List(data));
            })
        })
    }

    /* Since the managerFilter doesn't make sense in the generic case, delete this method from the 
    class. */

    /* Here we could add type annotations to make the code more transparent. The method applyFilter 
    expects an Employee Filter as input, but to enable multiple filters as input, we can define the 
    method input as a rest parameter "...filter" which is made available as an array of filters on 
    data type T within the method implementation. */
    applyFilter(...filters : Filter<T>[]) {
        let filteredList : T[] = [];
        for (let item of this) {
            /* The condition for adding items to the filtered list is then a logical conjunction of the 
            individual filter conditions. For that we could use the array method "every" on the filters 
            array. Remember that the "every" method takes a function as input describing how each array 
            element evaluates to true or false. In our case, a single filter yields true if the filter 
            function returns true when applied to the specific item.
            note: Since we used the reset operator the original code for testing the filter should work 
            as before. */
            if(filters.every(filter => filter(item))) {
                filteredList.push(item);
            }
        }
        return filteredList;
    };
}

/* Add a function singleValueFilter, the function should be generic function with a type variable T and 
it takes the parameters key and value. Exchange the any type by a more appropriate type, remember the 
keyof operator which returns all the members names of a certain type as string values. So, here we can 
annotate the parameter key with type keyof T, and for the parameter value we use a type lookup (we 
write T followed by keyof T in square brackets). The function will return a filter for data of type T. */
function singleValueFilter<T>(key: keyof T , value: T[keyof T]) : Filter<T> {
    /* A filter itself is a function which maps items of type T to true or false. */
    return function(item : T) {
        /* We return true if the property given by key equals the given value, else we return false. */
        return item[key] == value ? true : false;
    }
}

/* Update the definition of our employeeList object to be a promise of an Employee List; Call the static 
method CreateAsync and provide the function getEmployeeData as input which returns a promise of an 
Employee array. */
const employeeList = List.CreateAsync(getEmployeeData());

/* employeeList is now a promise of an Employee List instance and can be resolved by the "then" or 
"aync-await" syntax. We use "then" here followed by a completion handler which takes the resolved list as 
input, and define an applyFilter as before. */
employeeList.then((list) => {

    /* Now we can generate the manager filter by applying the generic function on the Employee type.
    Note: By hovering over the function call "singleValueFilter", note that the types of the parameters are 
    now inferred from the Employee type.
    We set key to "managementPosition" and value to true. So, the isManager filter selects Employee items with 
    managementPosition equals true. */
    const isManager = singleValueFilter<Employee>("managementPosition", true);
    console.log(`
    --- Filter the data by filter isManager ---
    `);
    console.log(list.applyFilter(isManager));
    /* Use the function to define another filter such as isFemale that selects all female employees. */
    const isFemale = singleValueFilter<Employee>("gender", "F");
    /* Now filter the data by isFemale */
    console.log(`
    --- Filter the data by filter isFemale ---
    `);
    console.log(list.applyFilter(isFemale));
    console.log(`
    --- Filter the data by multiple filters: isManager & isFemale ---
    `);
    console.log(list.applyFilter(isManager, isFemale));
    
})