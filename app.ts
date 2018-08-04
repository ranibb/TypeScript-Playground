// Define a function type "SimpleTask"
type SimpleTask = () => void; // Void indicates that the function doesn't return anything.

// Declare a constant "sayHello" as type of "SimpleTask" and assign a function to it.
const sayHello:SimpleTask = function () { 
    console.log("Hello!");
}
const hangry:SimpleTask = function () {
    console.log("I am hungry! I go to eat...");
}
const sayGoodbye:SimpleTask = function () {
    console.log("Goodbye!");
}

/* We have defined variables that store functions. These variables can be passed 
** around like other variables. For example, you could create an array with
** elements of type "SimpleTask" to store these functions in an array.
*/
const tasks : SimpleTask[] = [sayHello, hangry, sayGoodbye];

/* Suppose next we want to schedule these tasks in a simple way. Perform the first
** task then wait a predefined time then start the next task and so on.
*/
function simpleSchedule (delay: number) {
    return function() { // used to run the tasks sequentially. 
        let totalDelay = 0;
        for (let task of tasks) {
            setTimeout(task, totalDelay);
            /* understand that setTimeout doesn't work like a sleep or a wait 
            ** function blocking the process for the time set but is a scheduling 
            ** function that pause the task on another thread and let it start 
            ** with a delay measured from now.
            */
            totalDelay += delay;
        }
    }
}

// Run the tasks
const taskRunner = simpleSchedule(2000);
taskRunner();

// Use function in object
const taskManager = {
    tasksList: tasks,
    simpleSchedule: function (delay: number) {
        return () => { // Used to run the tasks sequentially. In order to change the behavior of "this" so its reference keep stable we use the arrow function syntax.
            let totalDelay = 0;
            for (let task of this.tasksList) {
            /* We don't refer to an array outside of the object but to the object 
            ** property taskslist which we can assign to it the tasks array we want.
            ** In order for the Property name tasksList to be found/accessed from 
            ** within the function (from within this object itself), we need to 
            ** use the special key word "this" to refer to the object instance itself.
            */
                setTimeout(task, totalDelay);
                /* understand that setTimeout doesn't work like a sleep or a wait 
                ** function blocking the process for the time set but is a scheduling 
                ** function that pause the task on another thread and let it start 
                ** with a delay measured from now.
                */
                totalDelay += delay;
            }
        }
    }
}

const taskRunner2 = taskManager.simpleSchedule(2000);
taskRunner2();