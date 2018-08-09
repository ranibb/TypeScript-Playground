interface Printable {
    toString(): string
}

class Point implements Printable {

    static origin = new Point(0,0);

    /* In order to prevent the manipulation of points from outside the class and to allow only the creation of 
    new points, no modification to coordinates, but at the same time to guarantee access to the coordinates from
    existing sub classes, declare the coordinates as protected. */
    constructor(protected x: number, protected y: number) {
    }
    distanceTo(otherPoint : Point) {
        return Math.sqrt( Math.pow(otherPoint.x - this.x,2) + Math.pow(otherPoint.y - this.y,2) )
    }
    toString() {
        return `Point: (${this.x}, ${this.y})`
    }
}

function print(source: Printable) {
    console.log(source.toString());
}

/**
 * By class inheritance or extension which means the same, drive class Observation that inherits from the 
 * Point class but in addition to the coordinates also includes a time stamp and a height information. 
 * Think of the case of a Trekking app that can record mountain treks or hikes. For that we need to know not 
 * only the current locations but also the times and heights. Also overwrite the constructor to include all 4 
 * parameters. The two coordinates as before, the timestamp and the current height. It is important here not 
 * to add access modifiers at the coordinates since we inherit the location properties and don't want to 
 * redeclare instance properties for the coordinates. Whereas we add the access modifiers private at the 
 * other two parameters indicating we want to declare them also as instance properties. To initialize the 
 * extended class instance, first initialize the base class which is the point class. To access a base class 
 * we have the special keyword "super". Therefore, call the constructor of the base class with super followed 
 * by the parameters in brackets, in our case, the coordinates. After initializing the super class we would 
 * proceed to initialize the remaining properties timestamp and height. However, we don't need to do that since 
 * it is done automatically by TypeScript when using the shortcut notation with access modifiers added to the 
 * constructor parameters. The procedure of initialization of a sub class is always the same. In a first step, 
 * we initialize the super class, and in a second step we initialize the properties added in the sub class.
 */
class Observation extends Point {
    constructor(x:number, y:number, private timestamp: Date, private height) {
        super(x, y)
    }
    /* In order to print observation data, we also overwrite the toString method to return a string with day 
    time, location and height information */
    toString() {
    return `Observation from: ${this.timestamp},
            at location: (${this.x}, ${this.y}),
            at the height of: ${this.height} m.`;
    }
}

/* Define two new observations */
const obs1 = new Observation(0, 0, new Date(), 1000);
const obs2 = new Observation(1, 1, new Date(), 2000);

/* Log information of both observations */
print(obs1);
print(obs2);

/* Also log the distance to check that this method is inherited correctly from the super class.*/
console.log(obs1.distanceTo(obs2));
/* Note that we didn't need to write a lot of code since class inheritance enabled us to reuse the 
functionality contained in the Point super class. */

/* The Trail Class has an instance property coordinates storing a sequence of points representing the trail. */
class Trail {
    
    /* In order to restrict direct access to coordinates, let us say to allow only adding points to the trail 
    by the add method, we could use the "private" keyword in front of the variable coordinates and add an
    explicit getter method. For that add an "_" as prefix to the private property by convention and write
    a getter with the "get" keyword followed by the property name without the "_" */
    private _coordinates: Point[] = []

    // The Getter
    get coordinates() : Point[] {
        // Keep it simple here and just return the coordinates
        return this._coordinates;
    }

    // The Setter
    set coordinates(newCoordinates : Point[]) {
        // To-do: code to Check if user is authorized..
        this._coordinates = newCoordinates;
    }

    /* A constructor without parameters that just initializes an empty trail. That is a trail with no points. */
    constructor() {
        this._coordinates = [];
    }

    // A method for adding new points to the trail.
    add(point: Point) : Trail {
        this._coordinates.push(point);
        return this; // returning the resulting trail instance.
    }

    // A method to return back the total distance of the whole trail.
    totalDistance() : number {

        /* The total distance is a sum of all distances between the points. So, we define a total variable. */
        let total = 0;

        /* Start with index 1 (that is the 2nd point) to add up the distances between points. */
        for (let index = 1; index < this._coordinates.length; index++) {

            /* So, the loop computes the sum of the distance from the 2nd point to the 1st point, The 3rd 
            point to the 2nd point, and so on. */
            total += this._coordinates[index].distanceTo(this._coordinates[index - 1])
        }

        return total;
    }
}

/* Obviously, we can still use the Trail class as before, but in case you like to drive for a more specific 
type, let’s call it a trek that guarantees that only observations are stored and not points, we could use inheritance 
again: */
class Trek extends Trail {

    /* We don't need to change the constructor, since on our case it just initializes the internal data 
    structure as an empty list. However, we want to ensure that only observations can be stored in a Trek
    object. So, overwrite the add method but changing the signature to allow only observations to be added. */
    add(observation: Observation) : Trail {

        // And for implementation reuse the code of the super class
        super.add(observation)
        return this;
    }

}

/* Now that we exchanged the trail by a trek... */ 
let trek = new Trek();
/* we can add observations... */
trek.add(obs1);
trek.add(obs2);
/* but we can't add an object of type Point //trek.add(new Point(1,1)); */

console.log(trek.totalDistance());

/**
* With this guarantee we could continue by adding more specific trek functionalities to the Trek class.
 */