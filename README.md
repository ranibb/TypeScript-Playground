# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Asynchronous Programming

As already pointed out in a lesson on arrow functions the use of asynchronous functions is motivated by operations which are more resource intensive and time consuming such as database transactions. These operations are coded asynchronously. Otherwise, we would block the main thread for other requests.

## Different ways to write asynchronous code

The main part of this lesson is dedicated to the different ways to write asynchronous code. The traditional way to program asynchronously is to use callbacks, the syntax is not really nice and they can get difficult to handle especially when chaining multiple call backs.

    async-F(...) -> callback(data) -> void

So, today most people prefer to use promises instead of call backs. Promises serve as a placeholder for future values.

    async-F(...) -> Promise<>

There is one way to define an asynchronous function with promises but two ways to apply these functions. Either we use "then" syntax or the newer async-await pattern.

then-Syntax

    PromisedData.then((data) -> void)

async-await pattern

    data = await promisedData

## Chaining of promises

How to chin multiple asynchronous functions in the three cases. When we use async-wait we get the most elegant code.

    async-F(...) -> Promise<data1>

        chaining...

    async-F(data1) -> Promise<data2>

## Error handling in asynchronous code

Error handling in promises with then-Syntax

    promiseData.then((data) -> void).catch((error) -> void)

Error handling in promises with await-pattern

    try
    {
        data = await promisedData
    }

    catch(error)
    {
        ...
    }


