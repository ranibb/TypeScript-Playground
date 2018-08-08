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
        // To-do: code to Check if user os authorized..
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

let trail = new Trail();
trail.add(homePosition);
trail.add(new Point(0,1));
trail.add(new Point(1,1));
trail.add(homePosition);

console.log(trail.totalDistance());

/* Be aware to get and set the property like a variable. Don't try to invoke the getters and setters like a
method. */
trail.coordinates = []; // Set the coordinates like a variable with an assignment.
console.log(trail.coordinates); // Get it like a variable without round brackets.