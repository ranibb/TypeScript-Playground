/* Since the function is the single export we market is as default */
export default function logProperty(target: Object, propertyKey: string) {
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