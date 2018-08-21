/* 
Starting with the code from Interfaces-Advanced-Topics branch we are going to do the following: 
• Write EmployeeList as a Class (Done)
• Make the code generic, so it not only applies for employee data but any type of data (Done)
• Remove the method managerFilter from the Class and provide a generic function singleValueFilter
• Allow multiple filters to be supplied in the applyFilter method
• Get employee data by asynchronous and put the employee data service in a separate module
*/

interface Employee {
    readonly employeeID : number
    department: string
    managementPosition: Boolean
    workExperience?: number
    gender: string
}

const employees : Employee[] = [
    {employeeID: 1, department: "IT", managementPosition: false, workExperience: 2, gender: "M"},
    {employeeID: 2, department: "IT", managementPosition: false, workExperience: 5, gender: "M"},
    {employeeID: 3, department: "IT", managementPosition: false, workExperience: 1, gender: "M"},
    {employeeID: 4, department: "IT", managementPosition: false, workExperience: 9, gender: "M"},
    {employeeID: 5, department: "IT", managementPosition: false, workExperience: 7, gender: "M"},
    {employeeID: 6, department: "IT", managementPosition: true, workExperience: 12, gender: "M"},
    { employeeID: 7, department: "IT", managementPosition: true, workExperience: 9, gender: "F"}
];

/* Rename the interface and add a generic type varaible T within angular brackets which represents the 
data the filter is working on. */
interface Filter<T> {
    /* A filter of for data of type T is a function which maps data of type T to true or false. */
    (e: T) : Boolean
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

    /* Since the managerFilter doesn't make sense in the generic case, delete this method from the 
    class. */

    /* Here we could add type annotations to make the code more transparent. The method applyFilter 
    expects an EmployeeFilter as input.  */
    applyFilter(filter : Filter<T>) {
        let filteredList : T[] = [];
        for (let item of this) {
            if(filter(item)) {
                filteredList.push(item);
            }
        }
        return filteredList;
    };
}

/* Update the code to creaet a list instance. Here, we can provide the Employee type for the generic type 
variable `new List<Employee>(employees)`, but we don't need to do so, since a type could also be infered 
from the data we supplied in the constructor function. */
// const employeeList : List<Employee> = new List<Employee>(employees);
const employeeList : List<Employee> = new List(employees);

/* Define the Filter isManager inplace by an arrow function mapping an Employee item to the attribute 
managementPosition which is true when the Employee is manager  */
const isManager :Filter<Employee> = ((item) => item.managementPosition);
console.log(employeeList.applyFilter(isManager));