export function logProperty(target, propertyKey) {
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