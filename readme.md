## How this was made (vs15-empty)

1. Create a blank solution in Visual Studio 2015
2. Create a aspnet web application using the aspnet 5 empty template in /generators folder
3. Clean the project, remove unneeded files. (project.json with a framework specified is needed)
4. Create a new ts file index.ts in the project
5. Open Command Line for the project
6. run "tsd init"
7. run "tsd install yeoman-generator --save"
8. add a typescript configuration file
9. set module flag to commonjs
10. start writing your index.ts generator
