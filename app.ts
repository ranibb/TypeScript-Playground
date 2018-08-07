/* Let say we need to deal with location data where a certain location is like a point in 2-dimentiaol
geometry described by 2 coordinates. */

class Point {

    /* Let us say we want to set the origin for every point globaly, then we could define a static property 
    orgin that stores the orgin inside the class. */
    static origin = new Point(0,0);

    /*A short cut notation for a trivial initialization cases: We could leave out the property declaration and 
    assignment. Instead add explicit access modifiers "Public" in the parameters list of the constructor */
    constructor(public x: number, public y: number) {
    }

    /* Define the instance method distanceTo */
    distanceTo(otherPoint : Point) {
        /* Note that the keyword "this" in the class points to the current instance of the class, not the
        class it self.*/
        return Math.sqrt( Math.pow(otherPoint.x - this.x,2) + Math.pow(otherPoint.y - this.y,2) )
    }
}

/*Static members are accessible inside or out side of the Class by the Class name and a "." notation */
Point.origin

// Check if the distance is computed correctly.
console.log(Point.origin.distanceTo(new Point(-1,-1)));

// use the point structure to define a Trail
interface Trail {

    coordinates: Point[] // A sequence of points.

    // A method for adding new points to the trail.
    add(point: Point) : Trail

    // A method to return back the total distance of the whole trail.
    totalDistance() : number
}