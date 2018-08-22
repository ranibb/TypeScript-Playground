export interface Employee {
    readonly employeeID : number
    department: string
    managementPosition: Boolean
    workExperience?: number
    gender: string
}

/* We create a function getEmployeeData which returns a promise of an Employee array. */
export function getEmployeeData() : Promise<Employee[]> {
    /* Within this function we have to return a new promise. As we know the promise has a resolve and a 
    reject parameters to describe the behavior in a success and error cases. Since we provide some dummy 
    data in-place, we can't get an error and therefore ignore the reject case. For the success case, we 
    resolve with our dummy data but with a delay of 2 seconds. For that, we use a setTimeout function with 
    a function to call as a first parameter and a delay of 2000 milliseconds as a second parameter. After 2 
    seconds, the Employee data is defined as before, so we just copy the original code inside. */
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const employees : Employee[] = [
                {employeeID: 1, department: "IT", managementPosition: false, workExperience: 2, gender: "M"},
                {employeeID: 8, department: "IT", managementPosition: false, workExperience: 3, gender: "F"},
                {employeeID: 2, department: "IT", managementPosition: false, workExperience: 5, gender: "M"},
                {employeeID: 3, department: "IT", managementPosition: false, workExperience: 1, gender: "M"},
                {employeeID: 4, department: "IT", managementPosition: false, workExperience: 9, gender: "M"},
                {employeeID: 5, department: "IT", managementPosition: false, workExperience: 7, gender: "M"},
                {employeeID: 6, department: "IT", managementPosition: true, workExperience: 12, gender: "M"},
                { employeeID: 7, department: "IT", managementPosition: true, workExperience: 9, gender: "F"}
            ];
            /* And we resolve the promise with the Employee data */
            resolve(employees)
        }, 2000);
    })
}