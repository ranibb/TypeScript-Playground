/* 
Starting with the code from Interfaces-Advanced-Topics branch we are going to do the following: 
• Write EmployeeList as a Class
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

interface EmployeeList extends Array<Employee> {
    managerFilter : (isManager: Boolean) => EmployeeFilter
    applyFilter : (filter: EmployeeFilter) => Employee[]
}

function getEmployeeList(employees: Employee[]) : EmployeeList {

    let list : EmployeeList = employees as EmployeeList;

    list.managerFilter = function(isManager) {
        return function(e) {
            return e.managementPosition == isManager ? true : false;
        }
    };

    list.applyFilter = function(filter) {
        let filteredList : Employee[] = [];
        for (let employee of employees) {
            if(filter(employee)) {
                filteredList.push(employee);
            }
        }
        return filteredList;
    };

    return list;
}

const employeeList : EmployeeList = getEmployeeList(employees);

const isManager = employeeList.managerFilter(true);
console.log(employeeList.applyFilter(isManager));