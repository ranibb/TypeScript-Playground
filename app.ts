/* A typical case where we use interfaces is to type the data that we retrieve from a database table. 
The properties of our employee object correspond to the columns in the employee database table.*/
interface Employee {
    employeeID : number
    department: string
    managementPosition: Boolean
    workExperience: number
    gender: string
}

// Define an array with an Employee type
const employees : Employee[] = [
    {employeeID: 1, department: "IT", managementPosition: false, workExperience: 2, gender: "M"},
    {employeeID: 2, department: "IT", managementPosition: false, workExperience: 5, gender: "M"},
    {employeeID: 3, department: "IT", managementPosition: false, workExperience: 1, gender: "M"},
    {employeeID: 4, department: "IT", managementPosition: false, workExperience: 9, gender: "M"},
    {employeeID: 5, department: "IT", managementPosition: false, workExperience: 7, gender: "M"},
    {employeeID: 6, department: "IT", managementPosition: true, workExperience: 12, gender: "M"}
];

/* creating an inline object that has exactly the same properties and types of an employee but not 
explicitly defined as such.*/
const newEmployee = { employeeID: 7, department: "IT", managementPosition: true, workExperience: 9, gender: "F"};
// Adding the inline object newEmployee to the array of type Employee.
employees.push(newEmployee);
// console.log(employees);

/* Another case where we use interfaces is to define an object that offers some functionality. Let 
say we want to build an object that represents an employee list that contains the employee data 
and add some additional functionality like filtering the data.*/
interface EmployeeList {

    employees : Employee[]

    /* Add a filter for the property managementPosition, let us call the method managerFilter. The filter 
    has the argument isManager and returns back a filtering function that describes the filter rule for 
    the employees. So, if you call the managerFilter with parameter true we should get back a function that 
    maps employees to true that are managers and others to false. This is the idea behind the type that 
    is defined as a returned value.*/
    managerFilter : (isManager: Boolean) => (e: Employee) => Boolean

    /* To apply the filter we need a second method that takes a filter and returns back the filtered array. 
    You might ask why we don’t return the filtered array directly but separated out into steps? 2 reasons: 
    First: It is good to repeat some stuff that you learned already; how to deal with function as a parameter 
    and returned value. Second: We could extend the solution more easily. For example, we could add other 
    filters and just to define the filtering rule that don't need to touch the code for the filter application.*/
    applyFilter : (filter: (e: Employee) => Boolean) => Employee[]
}

const employeeList : EmployeeList = {

    employees: employees,

    /* An easier notiation for the case when you use a function as an object method is to put the parameter 
    brackets directly after the method name.*/
    managerFilter(isManager) {
 // managerFilter: function(isManager) {
        return function(e) {
            return e.managementPosition == isManager ? true : false;
        }
    },
    applyFilter(filter) {
        let filteredList : Employee[] = [];
        for (let employee of this.employees) {
            if(filter(employee)) {
                filteredList.push(employee);
            }
        }
        return filteredList;
    }
}

const isManager = employeeList.managerFilter(true);
console.log(employeeList.applyFilter(isManager));




