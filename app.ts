/* Let say we need to deal with location data where a certain location is like a point in 2-dimentiaol
geometry described by 2 coordinates. */

/* Let us write a function that can print textual presentation of an object to the log, but the object has 
to meet the requirement of the Printable interface */
interface Printable {
    toString(): string
}

/* We state in the class declaration that we implement Printable interface. However, note that if don't state 
that, everything still works the same. That because TypeScript is based on structural typing not nominal 
typing. */
class Point implements Printable {

    /* Let us say we want to set the origin for every point globally, then we could define a static property 
    origin that stores the origin inside the class. */
    static origin = new Point(0,0);

    /*A short cut notation for a trivial initialization cases: We could leave out the property declaration and 
    assignment. Instead add explicit access modifiers "Public" in the parameters list of the constructor */
    constructor(public x: number, public y: number) {
    }

    /* Define the instance method distanceTo */
    distanceTo(otherPoint : Point) {

        console.log(`Point: (${otherPoint.x}, ${otherPoint.y})`);
        
        /* Note that the keyword "this" in the class points to the current instance of the class, not the
        class it self.*/
        return Math.sqrt( Math.pow(otherPoint.x - this.x,2) + Math.pow(otherPoint.y - this.y,2) )
    }

    // Impliment the interface in our Point class
    toString() {
        return `Point: (${this.x}, ${this.y})`
    }
}

/* A function that takes a printable source as parameter and print the textual presentation provided to the
console. */
function print(source: Printable) {
    console.log(source.toString());
}

// Check if the distance is computed correctly from a homePosition we set.
const homePosition : Point = new Point(0,1);
print(homePosition);
console.log(homePosition.distanceTo(new Point(-1,-1)));

// Check if the distance is computed correctly from an origin stated globally in the Class.
print(Point.origin);
console.log(Point.origin.distanceTo(new Point(-1,-1)));

// use the point structure to define a Trail
interface Trail {

    coordinates: Point[] // A sequence of points.

    // A method for adding new points to the trail.
    add(point: Point) : Trail

    // A method to return back the total distance of the whole trail.
    totalDistance() : number
}