/* We start with code from Decorators-meta-data-reflection branch. This code consists of logically different 
Parts: The main code with a point and trail class, the access control and logging facility. 

Whereas modules are used to organize our code in different files. Namespaces help us to group code within 
one and the same file. To do that, define a namespace Logging for grouping together all of the logging 
decorators. */

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
    toString() { return `Point: (${this.x}, ${this.y})` }
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

enum TrailPrivilege {
    readCoordinates,
    writeCoordinates,
    addPoints,
    getDistance
}

interface User {
    userID: string
    //...
    privileges: Set<TrailPrivilege>
}

const currentUser: User = { 
    userID: "TS10298", 
    privileges: new Set(
        [
            TrailPrivilege.readCoordinates,
            TrailPrivilege.addPoints,
            TrailPrivilege.getDistance
        ]
    )};

function methodRequiresPermission(privilege: TrailPrivilege) {
    return function requirePermission(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalValue = descriptor.value;
        descriptor.value = function(...args: any[]) {
            if(currentUser.privileges.has(privilege)) {
                return originalValue.apply(this, args);
            }
            else {
                console.log("You are not authorized for this action!"); 
            }
        }
        return descriptor; 
    }
}

function accessorRequiersPermission(readPrivilege: TrailPrivilege, writePrivilege: TrailPrivilege) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        if(!currentUser.privileges.has(readPrivilege)) {
            descriptor.get = () => console.log(`No permission to read property ${propertyKey}.`);
        }
        if(!currentUser.privileges.has(writePrivilege)) {
            descriptor.set = () => console.log(`No permission to write property ${propertyKey}.`);
        }
        return descriptor;
    }
}

/* Define a namespace "Logging" and copy the related decorators functions into the it. When we try to access 
one of the decorator’s functions by the "." syntax, we still get an error that the element doesn't exist. The 
reason is that namespace create their own scope and no elements are available outside of the namespace unless 
we explicitly mark them by the export keyword. After that we can access the decorators in the Trail class 
qualifying them by the name Logging. */
namespace Logging {
    export function logProperty(target: Object, propertyKey: string) {
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
    export function logInstanceCreation (target: Constructor) : Constructor {
        class C extends target {
            constructor(...args: any[]) {
                console.log("New "+ target.name + " Instance Created with Arguments: " + args.join(","));
                super(...args);
            }
        }
        return C;
    }
    
    const logParamsMeta = "logParamsMeta";
    export function logParam(target: Object, propertyKey: string, index: number) {
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
    
    export function logMethodParams(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const indexSet = [...Reflect.getMetadata(logParamsMeta, target).get(propertyKey)]
        const originalValue = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.log("Input for method " + propertyKey + ": " + indexSet.map((index) => args[index].toString()).join(", "));
            return originalValue.apply(this, args);
        }
        return descriptor;
    }
}

@Logging.logInstanceCreation
class Trail {
    @Logging.logProperty
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
    @Logging.logMethodParams
    @methodRequiresPermission(TrailPrivilege.addPoints)
    add(@Logging.logParam point: Point) : Trail {
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

@Logging.logInstanceCreation
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