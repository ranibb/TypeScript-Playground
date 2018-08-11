class Point {
    constructor(public x: number, public y: number) {
    }
}

/* Use inheritance to create class Point3d that is a subclass of class Point since it has all the properties of the 
2-dimensional Point but in addition a coordinate z */
class Point3d extends Point {
    constructor(x: number, y: number, public z: number) {
        super(x,y);
    }
}

/* Crate an instance P of the 2-dimensional Point class with coordinates (0,0) */
let p: Point = new Point(0,0);

/* Create an instance q of the 3-dimensional Point where all coordinates are set to 1 */
let q: Point3d = new Point3d(1,1,1);

/* What happens when we assign p to q and vice versa? In our discussion about type compatibility we concluded 
that a variable of type t could be assigned to a variable of type s if t contains at least all members of s. 
In other words, if t is a subtype of s. So, in our example, we expect TypeScript to accept the assignment */
p=q;
console.log(p);

/* But what if we want to initialize a 3- dimensional point by the coordinates x and y of a 2-dimentional point 
and set the z coordinate separately. In such a case, where we are going to assign a supertype to a subtype 
and partially initialize the subtype with members of the supertype we use the "as" operator for an explicit 
type assertion. */
p = new Point(0,0); // reset p
q = p as Point3d; 
console.log(q); // The x and y the properties from the super type are set.
console.log(q.z); // The z remains undefined.

/* By using the type assertion we get full control over the types of the variables we define but also 
responsibility to initialize the variables correctly. One example where we need type assertion: a hybrid type 
that we studied in lesson 6 in the context of interfaces. */