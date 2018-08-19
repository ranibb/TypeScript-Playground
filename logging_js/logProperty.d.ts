/*Add a declaration for the logProperty function with export declare function. As in the original TypeScript 
function, the "target" parameter is of type object and the "propertyKey" parameter is of type string. Now 
check in app.ts that the types have been added to the function. */
export declare function logProperty(target: Object, propertyKey: string);