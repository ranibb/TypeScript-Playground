# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Decorators

With decorators we can do some meta programming on classes and class members. In particular we will study examples of all the different types of decorators:
* Method Decorators
* Accessor Decorators
* Property Decorators
* Class Decorators
* Parameter Decorators

    @classDecorator
    class CName {
        @propertyDecorator
        property1: string
        private _property2: number
        constructor(prop: string) {
            this.property = prop;
        }
    }
    @accessorDecorator
    get property2() : number {
        return this._property2 = newValue;
    }
    @methodDecorator
    method(param1: string, @parameterDecorator param2: number) {
        ...
    }

In our examples we will also see how to use Decorator Factories to serve customized decorators and how to save and retrieve meta data information by meta data reflection.