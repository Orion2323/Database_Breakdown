# Database_Breakdown Repo
The purpose of this repo is to breakdown the content of the Database Concepts class CS 3330.
Each branch represents the development of setting up and interacting with a database. 

# To run program
Before running program, verify that your Ubuntu account data is correct in 'connect-to-database.js'.
Run the following command on the terminal
```
node index.js
```
Each step and their results will appear on terminal as they execute. Assuming no errors, the program will display the successful results of all steps and the overall route as they are executed on Insomnia.

# Routes
For executing routes in Insomnia: 
```
http://localhost:3000
```
The extension for the specififc routes are found in the API Documentation.

## File Descriptions
- middleware: 
    - model-middelware.js: folder that contains code for inserting middleware within execution chain

- models:
    - connect-to-database.js: file that holds main code for connecting and disconnecting from database.
    - course.js: file that contains code for SQL query executions to database in course table
    - student.js: file that contains code for SQL query executions to database in student table
- routes:
    - course.js: file that contains all routes for courses
    - student.js: file that contains all routes for students

- .gitignore: file used to specify which files Github ignores.

- index.js: file that holds code for routes to be executed in Insomnia.

- database_db.sql: A SQL file used to verify that code in index.js works.

- API Documentation: documentation for current routes on branch

- package-lock.json/package.json: JSON file that holds all dependencies needed for current code.

## Technologies/Tools Used
The results of this branch are based from a Windows machine. Set up and execution of project may differ for other Operating Systems.
 - Ubuntu 20.0 LTS
 - Insomnia
 - Javascript
 - SQL