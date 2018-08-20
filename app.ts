/* 
Starting with the code from Interfaces-Advanced-Topics branch we are going to do the following: 
• Write EmployeeList as a Class (Done)
• Make the code generic, so it not only applies for employee data but any type of data
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

interface EmployeeFilter {
    (e: Employee) : Boolean
}

/* Replaced the interface EmployeeList and the function getEmployeeList by a class EmployeeList. Hence, 
we define a class EmployeeList which extends an array of Employee. */
class EmployeeList extends Array<Employee>{

    /* The class constructor is responsible to initialize an EmployeeList by data (employees) in form of 
    an Employee array */
    constructor(employees: Employee[]) {
        /* Within the constructor, call the super class and provide the Employee data as parameter for 
        the super class constructor. Note the different ways to initialize an array; In our case, we 
        choose the option to initialize with data provided as a rest parameter. So, we add a reset 
        operator "..." in front of the initial data supplied as our own constructor parameter to covert 
        the array into a list. */
        super(...employees);
    }

    /* Here we could add type annotations to make the code more transparent. The method managerFilter 
    receives a Boolean parameter and returns and EmployeeFilter. */
    managerFilter(isManager : boolean) : EmployeeFilter {
        return function(e) {
            return e.managementPosition == isManager ? true : false;
        }
    };

    /* Here we could add type annotations to make the code more transparent. The method applyFilter 
    expects an EmployeeFilter as input.  */
    applyFilter(filter : EmployeeFilter) {
        let filteredList : Employee[] = [];
        for (let employee of employees) {
            if(filter(employee)) {
                filteredList.push(employee);
            }
        }
        return filteredList;
    };
}

/* Replaced the function call by the creation of a new instance of type EmployeeList.  */
const employeeList : EmployeeList = new EmployeeList(employees);

const isManager = employeeList.managerFilter(true);
console.log(employeeList.applyFilter(isManager));