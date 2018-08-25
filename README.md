# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

## Exercises

### Provide a way to easily switch on and off logging.

At the moment, logging is always on, so the console is always spoiled by all these logging messages, even we don't need them. Obviously, it would be desirable to have the option to switch on and off logging.

### Rewrite the totalDistance method in the Trail Class with the Array methods map and reduce

We computed the total distance of a trail by adding up the individual distances between the points using a for..loop. Now we want to replace the loop by the two array methods maps and reduce. Remember that `map` is used to transform an array into another array and `reduce` maps an array on a single value.
 
### Add a TrailRecording Class which can record Trails automatically based on a function that provides the current location

We will extend the code by the functionality to record trails automatically based on some location provider. You can just simulate the location provider by a function which returns some arbitrary location as a current location. Then write a class TrailRecording with public methods start and stop to start and stop recording and with a getter or a method to retrieve the recorded coordinates. And think yourself which additional private class members you need for the implementation. When finished, test your code by starting the recording and stopping it 3 seconds later.  

### Refactor the TrailRecording Class into a NameSpace

In the previous exercise we created a class for recording trails automatically. The class could be instantiated multiple times to run several recordings at the same time. To prevent that we could modify the class to become a singleton class. However, in many cases there is a better alternative to a singleton class, a Namespace. So, for this exercise refactor the code to replace the class by a Namespace.