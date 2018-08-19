/* Since the function is the single export we market is as default */

/* Sometimes we have to use 3rd party libraries which use module loaders such as the standard node module 
loader: common JS, and in that case a single export is specified by an export assignment instead of a default 
export. In our example, this would look as follows, "export default" is not added in front of the function, 
instead an export assignment is placed at the end of the file. */

/*export default*/ function logProperty(target: Object, propertyKey: string) {
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

export = logProperty;