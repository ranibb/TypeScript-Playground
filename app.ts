/* Enhance the class by a method "add" which takes another point as parameter. The method shifts the point by 
the coordinates of the other Point and returns back the shifted Point. Instead of a type assertion we need to 
use the class constructor to create a point from the data provided by some inline type object. */
class Point {
    constructor(public x: number, public y: number) {
    }
    /* A static method fromObject that takes an object of type any as input and returns a new Point 
    instance initialized by the input data. */
    static fromObject(obj: any) : Point {
        return new Point(obj.x, obj.y)
    }
    add(otherPoint: Point) : Point {
        this.x += otherPoint.x;
        this.y += otherPoint.y;
        return this;
    }
}

/* Use inheritance to create class Point3d that is a subclass of class Point since it has all the properties 
of the 2-dimensional Point but in addition a coordinate z */
class Point3d extends Point {
    constructor(x: number, y: number, public z: number) {
        super(x,y);
    }
}

/* Crate an instance P of the 2-dimensional Point class with coordinates (0,0) */
let p: Point = new Point(0,0);

/* Create an instance q of the 3-dimensional Point where all coordinates are set to 1 */
let q: Point3d = new Point3d(1,1,1);

/* Get an inline type object back from some database query that contains a data of a 2-dimensional Point and 
We want to assign a Point object with this data. */
let p_inline = {x:2, y:2};
/* Use the static method fromObject to assign the inline type object (create a Point instance based on the 
supplied data) */
p = Point.fromObject(p_inline);
/* Add another point */
console.log(p.add(new Point(3,3)));