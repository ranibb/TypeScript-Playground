/*
Starting with the code from Namespaces branch + a bit of house keeping; moving permissions related functions
and defentions to it's own module, we are going to do the following:
• Provide a way to easily switch on and off logging (Done)
• Rewrite the totalDistance method in the Trail Class with the Array methods map and reduce (Done)
• Add a TrailRecording Class which can record Trails automatically based on a function that provides the current location (Done)
• Refactor the TrailRecording Class into a NameSpace (Done)
*/

import * as AC from "./permission"
import "reflect-metadata";

/* If you `npm start` we get a lot of messages because of the logging we implemented. For an easy switch 
enabling or disabling logging we could just use a boolean constant that we defiene. Then, we need to update 
all the logging decorators to check for this option.*/
const logging = false; // test both cases when logging = true and when logging = false

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

namespace Logging {
    /* The property decorator function logProperty doesn't have a return value so we don't need to care about 
    it's return and can just skip the decorator's code in case logging is switch off. This is done by an 
    empty return statment. */
    export function logProperty(target: Object, propertyKey: string) {
        if(!logging) return;
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
                /* The situation is defferent for the class decorators, here wil just wrap the logging statment 
                that we added to the class and method by an if block; checking if logging is turned on or not */
                if(logging) {
                    console.log("New "+ target.name + " Instance Created with Arguments: " + args.join(","));
                }
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
        if(logging) {
            console.log(logParams);
        }
    }
    
    export function logMethodParams(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const indexSet = [...Reflect.getMetadata(logParamsMeta, target).get(propertyKey)]
        const originalValue = descriptor.value;
        descriptor.value = function(...args: any[]) {
            /* The situation is defferent for the method decorators, here wil just wrap the logging statment 
            that we added to the method by an if block. checking if logging is turned on or not */
            if(logging) {
                console.log("Input for method " + propertyKey + ": " + indexSet.map((index) => args[index].toString()).join(", "));
            }
            return originalValue.apply(this, args);
        }
        return descriptor;
    }
}

@Logging.logInstanceCreation
class Trail {
    @Logging.logProperty
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
    @Logging.logMethodParams
    @AC.methodRequiresPermission(AC.TrailPrivilege.addPoints)
    add(@Logging.logParam point: Point) : Trail {
        this._coordinates.push(point);
        return this;
    }
    @AC.methodRequiresPermission(AC.TrailPrivilege.getDistance)
    totalDistance() : number {
        /* Apply the map method on the trail coordinates to compute an array of distances between two 
        successive points. And then we add up these distances by use of the reduce method. The map method 
        takes a function as input which determines how each individual element should be mapped. */
        const totalDistance = this._coordinates.map((value, index, coord) => {
            /* Since a first element of the coordinates array has no proceeding element, we only compute the 
            distances of all the other points to their successors. For the first element we return a distance 
            of zero. */
            return index > 0 ? coord[index].distanceTo(coord[index-1]) : 0;
        })
        /* On the result of the map method we apply reduce to sum up all the individual distances */
        .reduce((previousValue, currentValue) => previousValue + currentValue);
        /* Finally, return total distance. */
        return totalDistance;
    }
}

/* 1- Add a function getCurrentLocation which returns an arbitrary Point */
function getCurrentLocation() : Point {
    /* Instead of returning a constant point, return a random point */
    // return new Point(0,0)
    return new Point(Math.random(), Math.random());
}

/* 2- Define the TrailRecording as a Namespace with a reset function and the methods start and stop. */
namespace TrailRecording {

    /* 3- Obviously, we also need a property for storing the recorded trail. Define the trail 
    property as a standard varibale with let keyword. */
    let _trail: Trail

    /* 4- Define the getter as a standard function. Also add the keyword export in front of the function.   */
    export function getTrail() {
        return _trail;
    }

    /* 5- Define the constructor as function reset, which itinitializes the trail with an empty trail instance. 
    Also add the keyword export in front of the function.  */
    export function reset( ) {

        /* Initialize the _trail property in the reset function with an empty trail instance. */
        _trail = new Trail();
    }

    /* 12- Create a private property isRecording with initial value of false. */
    let isRecording = false;

    /* 7-  Create a standard method which actually records a point. 
       9-  We need a locationProvider as a parameter to use it to add a current location to the trail.
       16- also add interval as parameter. 
       */
    function recordPoint(locationProvider: () => Point, interval : number) {

        /* 15- Update the recordPoint method to implement continues recording; wrap the whole code in an if 
        block to make sure that we only proceed recording as long as the flag isRecording is true. */
        if (isRecording) {

            /* 8- The method should add a point to the Trail, which will be provided by our function 
            getCurrentLocation. Therefore, we need a locationProvider as a parameter to use it to add a 
            current location to the trail. */
            _trail.add(locationProvider());

            /* 17- After recording the current location, we call the method recordPoint again after delay 
            given by the function parameter interval. */ 
            setTimeout(() => { 
                recordPoint(locationProvider,interval)
            }, interval);

        }
    }

    export function start(locationProvider: () => Point, interval : number) {

        /* 6- We need to make sure that a trail instance is initialized when starting the recording. 
        Therefore, we call reset in the start function in case the trail varibale is not yet istantiated */
        if (!_trail) {
            reset();
        }

        /* 13- Switch on status isRecording */
        isRecording = true;

        /* 10- Call recordPoint. */
        recordPoint(locationProvider, interval);
        /* 11- When we start recording, the current location is added. However, we expect a continues 
        recording of our location. For that, two more properties are required;
        First, we need to know when recording is active and when is not. 
        Second, we should have the option to set the interval of recording.
        Therefore, create a private property isRecording with initial value of false. And another property, 
        interval, which we add to the parameters of the recordPoint and start functions. */
    }

    /* Also add the keyword export in front of the function. */
    export function stop() {
        /* 14- Switch off status isRecording */
        isRecording = false;

    }

}

const trail = new Trail();
trail.add(new Point(0,0));
trail.add(new Point(1,1));
trail.add(new Point(2,2));
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
const obs3 = new Observation(2, 2, new Date(), 2000);
trek.add(obs1);
trek.add(obs2);
trek.add(obs3);
console.log(trek.coordinates);
console.log(trek.totalDistance());

/* 18- Call the start and stop methods on the TrailRecording namespace */
TrailRecording.start(getCurrentLocation, 1000);

/* 19- And stop it after certain time pass, let’s say 3 seconds. */
setTimeout(() => {
    TrailRecording.stop();
    /* 20- After its stopped, log the recorded trail to the console.   */
    console.log(TrailRecording.getTrail().coordinates);
}, 3000)