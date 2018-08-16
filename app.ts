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
                                    TrailPrivilege.addPoints
                                ]
                            )};

/* The function/decorator requireAddPointPermission has to be implemented as a method decorator. A method 
decorator has three arguments that are provided automatically by placing a decorator on a class method. The
first argument is a target which is a prototype of the class. The second is a property Key which is a 
method name. And a third is Property Descriptor which contains information about the method, in particular 
it contains the value property with the method implementation. */
function requireAddPointPermission(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    /* For an implementation of the decorator we first save the original method implementation stored in 
    descriptor.value in a constant orginalValue. */
    const originalValue = descriptor.value;
    /* Then we redefine the add method by setting a new value for the descriptor. We don't need to state the 
    arguments of the method explicitly. It’s enough to define a list of arguments of type any. The arguments 
    are then supplied automatically depending where the decorator is placed on. */
    descriptor.value = function(...args: any[]) {
        /* The original function is modified by checking for the TrailPrivilege.addPoints and incase the user 
        has a right to add points… */
        if(currentUser.privileges.has(TrailPrivilege.addPoints)) {
            /* if it has, we execute the original method implementation and return originalValue. For 
            invoking the original method we use the apply method on orginalValue and provide a "this" 
            reference and the original method arguments as parameters. */
            return originalValue.apply(this, args);
        }
        /* In case the user doesn't have the appropriate TrailPrivilege we log a message to the console to 
        inform the user that he is not authorized to add points. */
        else {
            console.log("You are not authorized to add points!"); 
        }
    }
    return descriptor; 
}

class Trail {
    private _coordinates: Point[] = []
    get coordinates() : Point[] { return this._coordinates; }
    set coordinates(newCoordinates : Point[]) { this._coordinates = newCoordinates; }
    constructor() { this._coordinates = []; }

    /* Then we use a method decorator on the method add for checking the user permission to add points. A 
    decorator is declared with the @ followed by function name (decorator function name). Since we declared 
    the decorator at a class method; hence, it’s of type method decorator. */
    @requireAddPointPermission 
    add(point: Point) : Trail {
        this._coordinates.push(point);
        return this;
    }
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
console.log(trail.coordinates);

class Trek extends Trail {
    add(observation: Observation) : Trail {
        super.add(observation)
        return this;
    }
}

/* Test our Decorator function by creating a new trek */
let trek = new Trek();
const obs1 = new Observation(0, 0, new Date(), 1000);
trek.add(obs1);
console.log(trek.coordinates);