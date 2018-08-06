/* Let say we need to deal with location data where a certain location is like a point in 2-dimentiaol
geometry described by 2 coordinates. */

interface Point {

    x : number
    y : number

    // A method that takes otherPoint as parameter and returns the distance to that point
    distanceTo(otherPoint : Point) : number
}

/* Since the interface describes the shape and doesn’t implement functionality we have to provide not only
the individual point data and implementation but also the general logic and functionality of the point type. 
A solution in our case would be to define a function, let us call it newPoint, that takes the individual 
point parameter that is a coordinate as input and returns a fully functional Object of Point type. */
function newPoint(x : number, y : number) : Point {
    return {
        x : x,
        y : y,
        distanceTo(otherPoint) {
            /* The distance is computed by Pythagorean theorem as a square root of the sum of the otherPoints 
            coordinates each raise to the power of 2 */
            return Math.sqrt( Math.pow(otherPoint.x - x,2) + Math.pow(otherPoint.y - y,2) )
    
        }
    }
}

/* With the newPoint function it is much easier to create newPoint objects. The only disadvantage is that we 
need 2 steps: an interface and a separate function. The idea to combine the structure blue print for the 
individual objects and the general logic and functionality of the type is just the idea of a class */

// Use the function to create our homePosition
const homePosition : Point = newPoint(0,0);

// Check if the distance is computed correctly.
console.log(homePosition.distanceTo(newPoint(-1,-1)));

// use the point structure to define a Trail
interface Trail {

    coordinates: Point[] // A sequence of points.

    // A method for adding new points to the trail.
    add(point: Point) : Trail

    // A method to return back the total distance of the whole trail.
    totalDistance() : number
}