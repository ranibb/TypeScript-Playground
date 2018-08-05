/* To deepen our understanding of interfaces we are going to refactor the code to use modifiers of object type 
interface and constructing other interfaces that are not of the object type but of the function, index and 
hybrid types */

interface Employee {
    readonly employeeID : number // mark this property as readonly by adding "readonly" before property name
    department: string
    managementPosition: Boolean
    workExperience?: number // mark this property as optional by adding the "?" after property name
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


/* We can define an EmployeeFilter as a function type interface, where EmployeeFilter takes employees and
maps them to either true or false. */
interface EmployeeFilter {
    (e: Employee) : Boolean
}

/* We want the EmployeeList to be like an array but with our additional filtering functionality. Therefore, We 
use an interface extension to make our EmployeeList a subtype of the Array type instead of defining our
own index type. This is done by using angular brackets syntax. */
interface EmployeeList extends Array<Employee> {

    /* Make use of the EmployeeFilter when defining the methods managerFilter and applyFilter */
    managerFilter : (isManager: Boolean) => EmployeeFilter
    applyFilter : (filter: EmployeeFilter) => Employee[]
}

/* To initialize such a construct. We first have to assign the array and then define on it the additional 
methods. To encapsulate this code, we create a function getEmployeeList that takes an array of employees as 
an input. */
function getEmployeeList(employees: Employee[]) : EmployeeList {

    /* Create a variable list with type EmployeeList, if you assign the employees array we get an error
    because we can't assign a supertype to a subtype because a supertype has not all properties required
    by the subtype. However, there is a way to force TypeScript to assign it by using a type assertion.
    We us the "as" keyword to tell TypeScript that we explicitly we want to fuel the employees array as
    an EmployeeList. That way we partially initialize the object and now can add the additional methods 
    managerFilter and applyFilter. */

    let list : EmployeeList = employees as EmployeeList;

    list.managerFilter = function(isManager) {
        return function(e) {
            return e.managementPosition == isManager ? true : false;
        }
    };

    list.applyFilter = function(filter) {
        let filteredList : Employee[] = [];
        for (let employee of employees) { // No need for "this" keyword because employees now is a function parameter.
            if(filter(employee)) {
                filteredList.push(employee);
            }
        }
        return filteredList;
    };

    return list;
}

/* To initialize the EmployeeList, we could now create a variable employeeList of type EmployeeList and assign the 
employees array. The employeeList now becomes an array with some additional features added. The employees are not 
just a part of the EmployeeList but they are the defining element. */
const employeeList : EmployeeList = getEmployeeList(employees);

/* Now that we defined the EmployeeList as a hybrid type instead of a pure object type we can access data 
directly without "." notation.  And with the "." we have our own methods and all the standard methods of 
an array available. */
// employeeList[4]
// employeeList.applyFilter
// employeeList.managerFilter

const isManager = employeeList.managerFilter(true);
console.log(employeeList.applyFilter(isManager));