/* Now to make TrailPrivilege available for other modules, we add the keyword export in front of enum. */
export enum TrailPrivilege {
    readCoordinates,
    writeCoordinates,
    addPoints,
    getDistance
}

/* Since a user data is only required for the decorator functions below, we don't to export it. */
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
    )
}

export function methodRequiresPermission(privilege: TrailPrivilege) {
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

export function accessorRequiersPermission(readPrivilege: TrailPrivilege, writePrivilege: TrailPrivilege) {
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