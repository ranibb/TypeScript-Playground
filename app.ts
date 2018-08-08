interface Printable {
    toString(): string
}

class Point implements Printable {
    static origin = new Point(0,0);
    constructor(public x: number, public y: number) {
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

const homePosition : Point = new Point(0,0);
console.log(homePosition);

print(homePosition);
console.log(homePosition.distanceTo(new Point(-1,-1)));

/* The Trail Class has an instance property coordinates storing a sequence of points representing the trail.*/
class Trail {
   
    coordinates: Point[] = [] // A sequence of points representing the trail

    /* A constructor without parameters that just initializes an empty trail. That is a trail with no points. */
    constructor() {
        this.coordinates = [];
    }

    // A method for adding new points to the trail.
    add(point: Point) : Trail {
        this.coordinates.push(point);
        return this; // returning the resulting trail instance.
    }

    // A method to return back the total distance of the whole trail.
    totalDistance() : number {

        /* The total distance is a sum of all distances between the points. So, we define a total variable. */
        let total = 0;

        /* Start with index 1 (that is the 2nd point) to add up the distances between points. */
        for (let index = 1; index < this.coordinates.length; index++) {

            /* So, the loop computes the sum of the distance from the 2nd point to the 1st point, The 3rd 
            point to the 2nd point, and so on. */

            total += this.coordinates[index].distanceTo(this.coordinates[index - 1])
        }

        return total;
    }
}

let trail = new Trail();
trail.add(homePosition);
trail.add(new Point(0,1));
trail.add(new Point(1,1));
trail.add(homePosition);

console.log(trail.totalDistance());