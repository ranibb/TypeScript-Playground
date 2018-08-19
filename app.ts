/* We start with code from Decorators-meta-data-reflection branch. This code consists of logically different 
Parts: The main code with a point and trail class, the access control and logging facility. To organize the 
code in different files, start with the code dealing with user permissions, for that create a new file 
permission.ts and move the enum TrailPrivilege to the new file. Then we can import TrailPrivilege by 
explicitly list it in curly braces from the path to the other file. To proceed with our code reorganization 
next move all the other related elements of permissions to the new file. Accordingly, import two decorators 
functions within the curly braces. */
import { TrailPrivilege, methodRequiresPermission, accessorRequiersPermission } from './permission';

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

function logProperty(target: Object, propertyKey: string) {
    let value = target[propertyKey];
    Reflect.deleteProperty(target, propertyKey);
    Reflect.defineProperty(target, propertyKey, {
        get: function() {
            console.log("Get value: ", value);
            return value;
        },
        set: function(newValue) {
            console.log("Set value: ", value);
            value = newValue;
        }
    })
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
    @accessorRequiersPermission(TrailPrivilege.readCoordinates, TrailPrivilege.writeCoordinates)
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
    @methodRequiresPermission(TrailPrivilege.addPoints)
    add(@logParam point: Point) : Trail {
        this._coordinates.push(point);
        return this;
    }
    @methodRequiresPermission(TrailPrivilege.getDistance)
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