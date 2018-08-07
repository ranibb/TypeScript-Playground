/* Let say we need to deal with location data where a certain location is like a point in 2-dimentiaol
geometry described by 2 coordinates. */

// Instead of the interface Point and the function newPoint, we just going to creaet a Point Class
class Point {
    x : number
    y : number

    /* A constructor function that is called when a new Point instance is created. It is resposible for 
    initialze the instance properties */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /* Define the instance method distanceTo */
    distanceTo(otherPoint : Point) {
        /* Note that the keyword "this" in the class points to the current instance of the class, not the
        class it self.*/
        return Math.sqrt( Math.pow(otherPoint.x - this.x,2) + Math.pow(otherPoint.y - this.y,2) )
    }
}

/* Let us define the homePosition with help of the class. To create a new class instance we use "new" keyword
followed by the class name followed by parameters in brackets as declared in class a constructor. */
const homePosition : Point = new Point(0,0);

// Check if the distance is computed correctly.
console.log(homePosition.distanceTo(new Point(-1,-1)));

// use the point structure to define a Trail
interface Trail {

    coordinates: Point[] // A sequence of points.

    // A method for adding new points to the trail.
    add(point: Point) : Trail

    // A method to return back the total distance of the whole trail.
    totalDistance() : number
}