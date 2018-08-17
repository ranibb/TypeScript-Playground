import { get } from "https";

/* The Classes point, Observation, Trail and Trek are explained in Classes-and-Object-Oriented-Design 
branch of this repository. */

interface Printable {
    toString(): string
}

class Point implements Printable {
    static origin = new Point(0,0);
    constructor(protected x: number, protected y: number) {}
    distanceTo(otherPoint : Point) {
        return Math.sqrt( Math.pow(otherPoint.x - this.x,2) + Math.pow(otherPoint.y - this.y,2) )
    }
    toString() { return `Point: (${this.x}, ${this.y})` }
}

function print(source: Printable) { console.log(source.toString()); }

class Observation extends Point {
    constructor(x:number, y:number, private timestamp: Date, private height: number) { super(x, y) }
    toString() {
    return `Observation from: ${this.timestamp},
            at location: (${this.x}, ${this.y}),
            at the height of: ${this.height} m.`;
    }
}

/* Our first goal is to check the user Permission for the different public members of the Trail class. 
Specifically, we have to check permission for the two methods; add and totalDistance. And we have to check 
the permission on getting and setting coordinates.
We start by listing these Trail Privileges in an enumeration. */
enum TrailPrivilege {
    readCoordinates,
    writeCoordinates,
    addPoints,
    getDistance
}

/* In a real-world case, we would retrieve the user privileges from a user database. But for illustration we 
simply provide the data in the code. First define a User interface with a UserID and a couple of other 
properties we don't include explicitly, and with the attribute privileges that is a Set of type 
TrailPrivilege. */
interface User {
    userID: string
    //...
    privileges: Set<TrailPrivilege>
}
/* Also create a constant for the currentUser with an arbitrary userId and the user privileges which are 
defined as a new Set of some of the Trail Privileges. Test by removing and adding TrailPrivilege.addPoints 
and console log the two variations*/
const currentUser: User = { userID: "TS10298", 
                            privileges: new Set(
                                [
                                    TrailPrivilege.readCoordinates,
                                    TrailPrivilege.addPoints,
                                    TrailPrivilege.getDistance
                                ]
                            )};

/* Adding different decorators for different methods is not practical in case the decorators are going to be 
similar. In our case of adding a decorator for the totalDistance to serve the same purpose, the only thing 
that change is a required privilege. In order to avoid redefining similar decorators for each method, we use 
the decorator factory to customize a method decorator depending on the particular method. For the 
implementation rap the code in a factory function methodRequiresPermission with a privilege as argument and 
return the method decorator function requireAddPointPermission (change the function name to some thing 
more generic since it is now being used by "add" and "totalDistance" methods to check user permissions). 
Actyally, we can get rid of the function name and just return a function without a name. */
function methodRequiresPermission(privilege: TrailPrivilege) {
    /* The function/decorator requirePermission has to be implemented as a method decorator. A method 
    decorator has three arguments that are provided automatically by placing a decorator on a class method. 
    The first argument is a target which is a prototype of the class. The second is a propertyKey which is 
    the method name. And the third is a descriptor which contains information about the method, in 
    particular it contains the value property with the method implementation. */
    return function requirePermission(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        /* For an implementation of the decorator we first save the original method implementation stored in 
        "descriptor.value" in a constant orginalValue. */
        const originalValue = descriptor.value;
        /* Then we redefine the add method by setting a new value for the descriptor. We don't need to state 
        the arguments of the method explicitly. It’s enough to define a list of arguments of type any. The 
        arguments are then supplied automatically depending where the decorator is placed on. */
        descriptor.value = function(...args: any[]) {
            /* The original function is modified by checking for the TrailPrivilege.addPoints and incase the 
            user has a right to add points…
            Replace the hard coded TrailPrivilege.addPoints by privilege; the parameter of the decorator 
            factory */
            if(currentUser.privileges.has(privilege)) {
                /* if it has, we execute the original method implementation and return originalValue. For 
                invoking the original method we use the apply method on orginalValue and provide a "this" 
                reference and the original method arguments as parameters. */
                return originalValue.apply(this, args);
            }
            /* In case the user doesn't have the appropriate TrailPrivilege we log a message to the console 
            to inform the user that he is not authorized to add points. */
            else {
                console.log("You are not authorized for this action!"); 
            }
        }
        return descriptor; 
    }
}

/* Define decorator factory accordingly */
function accessorRequiersPermission(readPrivilege: TrailPrivilege, writePrivilege: TrailPrivilege) {
    /* Return an accessor decorator which also has the three parameters; target, propertyKey and descriptor 
    like the method decorator. Remember that in our method decorator, the original method implementation was 
    stored in "descriptor.value" and our job is to overwrite the value property with a modified method 
    implementation. In the accessor decorator we don't use "descriptor.value", instead we have the two 
    properties; "descriptor.get" and "descriptor.set" for the Getter and the Setter implementation. */
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        /* For checking permission on the getter we look if the user doesn’t have the read privilege... */
        if(!currentUser.privileges.has(readPrivilege)) {
            /* In such a case we overwrite the getter and log a message to the console. */
            descriptor.get = () => console.log(`No permission to read property ${propertyKey}.`);
        }
        /* In case the user has a privilege, we don't need to do anything. We leave the "descriptor.get" as
        it was. */

        /* For checking permission on the setter, we do the same but with slight modification. */
        if(!currentUser.privileges.has(writePrivilege)) {
            /* In such a case we overwrite the getter and log a message to the console. */
            descriptor.set = () => console.log(`No permission to write property ${propertyKey}.`);
        }
        return descriptor;
    }
}

/* Unlike the method and accessor decorators, the property decorator takes only two arguments; target and 
propertyKey. target represents the object and propertyKey represents the name of the property. */
function logProperty(target: Object, propertyKey: string) {

    /* So, the first step in the decorator implementation is to retrieve the value of the property by target 
    followed by the property key in square brackets.*/
    let value = target[propertyKey];

    /* The next steps are to delete and redefine this property. This is done by static methods on the 
    reflect object. The reflect object provides methods for some common operations on classes and 
    functions like defining new properties, applying functions or checking if a class has a particular 
    property. In our situation, first call the method deleteProperty with the target and propertyKey as 
    arguments in order to delete the _coordinates property.*/
    Reflect.deleteProperty(target, propertyKey);

    /* Next, redefine the property by invoking the method defineProperty with the arguments: target, 
    propertyKey and an object of attributes specifically the get and set attributes. */
    Reflect.defineProperty(target, propertyKey, {

        /* Thus we define the property by a getter and a setter. To start with implementation that yields 
        the original result we define the getter as a function which returns the value of our property. Inside 
        the getter we can modify the behavior of the property. In our example, we just log when get is called. 
        By running this code, check that in the console messages for get operations are now shown. */
        get: function() {
            console.log("Get value: ", value);
            return value;
        },

        /* And we define a setter as a function which takes a newValue as parameter and sets the value to a 
        newValue. Inside the setter we can modify the behavior of the property. In our example, we just log 
        when set is called. By running this code, check that in the console messages for set operations are 
        now shown. */
        set: function(newValue) {
            console.log("Set value: ", value);
            value = newValue;
        }
    })

}

class Trail {

    /* Obviously, it doesn't make much sense to check the permission for the private property "_coordinates". 
    Therefore, we use a simple logging functionality as illustration for the property decorator type. In 
    front of the private property "_coordinates" we add a property decorator called "logProperty". */
    @logProperty
    private _coordinates: Point[] = []

    /* Accessor Decorators use the same syntax as method decorator. Although in our example we have one 
    accessor pair get coordinates() and set coordinates(), we use a decorator factory as like before. Lets 
    call the factory function accessorRequiersPermission and provide two arguments; a readCoordinates and 
    writeCoordinates trail privileges.*/
    @accessorRequiersPermission(TrailPrivilege.readCoordinates, TrailPrivilege.writeCoordinates)
    get coordinates() : Point[] { return this._coordinates; }
    set coordinates(newCoordinates : Point[]) { this._coordinates = newCoordinates; }
    
    constructor() { this._coordinates = []; }

    /* Use a decorator factory function methodRequiresPermission and provide a required TrailPrivilege as an 
    argument to the function. In this case the addPoints privilege. */
    @methodRequiresPermission(TrailPrivilege.addPoints)
    add(point: Point) : Trail {
        this._coordinates.push(point);
        return this;
    }
    /* The more generic version with a decorator factory can be used for the other method totalDistance as 
    well */
    @methodRequiresPermission(TrailPrivilege.getDistance)
    totalDistance() : number {
        let total = 0;
        for (let index = 1; index < this._coordinates.length; index++) {
            total += this._coordinates[index].distanceTo(this._coordinates[index - 1])
        }
        return total;
    }
}

/* Test our Decorator function by creating a new trail */
const trail = new Trail();
trail.add(new Point(0,0));
trail.add(new Point(1,1));
console.log(trail.coordinates);
console.log(trail.totalDistance());

class Trek extends Trail {
    add(observation: Observation) : Trail {
        super.add(observation)
        return this;
    }
}

/* Test our Decorator function by creating a new trek */
let trek = new Trek();
const obs1 = new Observation(0, 0, new Date(), 1000);
const obs2 = new Observation(1, 1, new Date(), 2000);
trek.add(obs1);
trek.add(obs2);
console.log(trek.coordinates);
console.log(trek.totalDistance());