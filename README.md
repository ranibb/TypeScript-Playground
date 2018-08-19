# TypeScript Playground

* Run `npm start` for TypeScript execution and REPL (read–eval–print loop).

# Modules and Namespaces

Modules and Namespaces are concepts that help us to organize our TypeScript code. With Modules we distribute the code over different files and with Namespaces we group code within a file.

## Modules: Organize the code in different files
We will start first with modules and we will see how to export and import module content. If you don't use explicit export and import statements we can't use code written in other files since each typescript file has its own scope. So, we mark all components we want to make available in other files with the export keyword and then we can import all or some of these components in other files using an import statement. In case we only want to export a single component, we use default export then a syntax for importing becomes a little easier. Sometimes 3rd party modules use an export assignment, export equals to define a single module export based on a module loader such as common JS. Then we also have to change the way of importing such a module. We finish the first part of modules by covering a case of a JavaScript module that we like to import in our TypeScript project.

* Export and Import Statements
* Default Exports and Export =
* Importing JavaScript Modules

Note: covering Namespaces subject on it's own branch.