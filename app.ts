/* We start with code from Decorators-meta-data-reflection branch. This code consists of logically different 
Parts: The main code with a point and trail class, the access control and logging facility. To organize the 
code in different files, start with the code dealing with user permissions, for that create a new file 
permission.ts and move the enum TrailPrivilege to the new file. Then we can import TrailPrivilege by 
explicitly list it in curly braces from the path to the other file. To proceed with our code reorganization 
next move all the other related elements of permissions to the new file. Accordingly, import two decorators 
functions within the curly braces. */
// import { TrailPrivilege, methodRequiresPermission, accessorRequiersPermission } from './permission';

/* In case we import just a couple of elements, its a good practice to state the imports explicitly as we did. 
However, if we want to import a large number of elements, its more convenient to import all experts of the 
other file under a particular name used to access these elements. We do that by import "*" followed by "as" 
and a "name" for accessing the imported elements, followed by the module reference; the path to the file. */
import * as AC from "./permission"
/* If you type the name AC followed by a dot, we then see the list of all imported elements. Now be aware to 
change all the external references in our code to include the name AC */

/* With the logging decorators we could deal in a similar way and put them in a logging module, but I want to 
use the logging decorators to illustrate the concept of a default export. we should mark and export as default 
if it is the only export in a module. In our case, first create a new folder named "logging" and put all the 
logging decorators in separate files in that folder. Is efficient here to handle a case of logProperty as an
example, so let’s create a file logProperty.ts in the logging folder and move the logProperty decorator 
function to that file. Then we import that function by "import" followed by a "name" that we like to use to
reference the default export in our module followed by the module reference; the path to the file. */
// import logProperty from "./logging/logProperty"

/* For the import, write import logProperty followed by an equal sign and a require function with a module 
reference as argument. Depending on our complier settings, the solution might not work and error might be  
shown that exports or import assignments are not accepted. To fix this issue go to tsconfig.ts and add a 
complier option "module" and set it to "commonjs". */
import logProperty = require("./logging/logProperty");

import "reflect-metadata";

interface Printable {
    toString(): string
}

class Point implements Printable {
    static origin = new Point(0,0);
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

class Observation extends Point {
    constructor(x:number, y:number, private timestamp: Date, private height: number) { 
        super(x, y) 
    }
    toString() {
    return `Observation from: ${this.timestamp},
            at location: (${this.x}, ${this.y}),
            at the height of: ${this.height} m.`;
    }
}

type Constructor = new(...args: any[]) => any;
function logInstanceCreation (target: Constructor) : Constructor {
    class C extends target {
        constructor(...args: any[]) {
            console.log("New "+ target.name + " Instance Created with Arguments: " + args.join(","));
            super(...args);
        }
    }
    return C;
}

const logParamsMeta = "logParamsMeta";
function logParam(target: Object, propertyKey: string, index: number) {
    let logParams = Reflect.getMetadata(logParamsMeta, target) as Map<string, Set<number>>;
    if(!logParams) {
        logParams = new Map<string, Set<number>>();
    }
    if(!logParams.has(propertyKey)) {
        logParams.set(propertyKey, new Set([index]));
    }
    else {
        let indexSet = logParams.get(propertyKey) as Set<number>;
        indexSet.add(index);
        logParams.set(propertyKey, indexSet);
    }
    Reflect.defineMetadata(logParamsMeta, logParams, target);
    console.log(logParams);
}


function logMethodParams(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const indexSet = [...Reflect.getMetadata(logParamsMeta, target).get(propertyKey)]
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log("Input for method " + propertyKey + ": " + indexSet.map((index) => args[index].toString()).join(", "));
        return originalValue.apply(this, args);
    }
    return descriptor;
}

@logInstanceCreation
class Trail {
    @logProperty
    private _coordinates: Point[] = []
    @AC.accessorRequiersPermission(AC.TrailPrivilege.readCoordinates, AC.TrailPrivilege.writeCoordinates)
    get coordinates() : Point[] { 
        return this._coordinates; 
    }
    set coordinates(newCoordinates : Point[]) { 
        this._coordinates = newCoordinates; 
    }
    constructor() { 
        this._coordinates = []; 
    }
    @logMethodParams
    @AC.methodRequiresPermission(AC.TrailPrivilege.addPoints)
    add(@logParam point: Point) : Trail {
        this._coordinates.push(point);
        return this;
    }
    @AC.methodRequiresPermission(AC.TrailPrivilege.getDistance)
    totalDistance() : number {
        let total = 0;
        for (let index = 1; index < this._coordinates.length; index++) {
            total += this._coordinates[index].distanceTo(this._coordinates[index - 1])
        }
        return total;
    }
}

const trail = new Trail();
trail.add(new Point(0,0));
trail.add(new Point(1,1));
console.log(trail.coordinates);
console.log(trail.totalDistance());

@logInstanceCreation
class Trek extends Trail {
    add(observation: Observation) : Trail {
        super.add(observation)
        return this;
    }
}

let trek = new Trek();
const obs1 = new Observation(0, 0, new Date(), 1000);
const obs2 = new Observation(1, 1, new Date(), 2000);
trek.add(obs1);
trek.add(obs2);
console.log(trek.coordinates);
console.log(trek.totalDistance());