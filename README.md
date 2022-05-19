# *Database Breakdown Repo*
## **Additions to this branch**
Instead of hardcoding raw SQL queries to get data from the database, knex will be used in its place to allow for more flexibility of what data can be requested. Knex is a SQL query builder. 

The concept of user authentication and passwords will be implemented using JSON web tokens.
Expanding on this concept, the routes in this branch will be executed from the perspective of a student enrolling and dropping classes, viewing their transcript and their personal data.

## **To run program**
Before running program, verify that your Ubuntu account data is correct in 'knexfile.js'.
Run the following command on the terminal
```
node index.js
```
Each step and their results will appear on terminal as they execute. Assuming no errors, the program will display the successful results of all steps and the overall route as they are executed on Insomnia.

## **Routes**
For executing routes in Insomnia: 
```
http://localhost:3000
```
The extensions for the specififc routes are found in the API Documentation.

## **File Descriptions**
- database:
    - knex.js: File for allowing knex to be executed in program
- middleware:
    - auth.js: File that authenticates user with JSON Web Tokens
    - model-middelware.js: folder that contains code for inserting middleware within execution chain
- models:
    - course.js: file that contains code for interactions with database in course table
    - enrollment.js: file that contains code for interactions with database in enrollment table
    - session.js: file that contains code to mimicking a sign in/log in perspective within program
    - users.js: file that contains code for interactions with database in student table
- routes:
    - session.js: file that contains routes for sign in/log in
    - users.js: file that contains all routes for users(students in this branch)
- .gitignore: file used to specify which files Github ignores.
- database_db.sql: A SQL file used to verify that code in index.js works.
- index.js: file that holds code for routes to be executed in Insomnia.
- knexfile.js: file that connects to database for knex to executive SQL queries
- API Documentation: documentation for current routes on branch
- package-lock.json/package.json: JSON file that holds all dependencies needed for current code.

## **Technologies/Tools/Languages Used**
 - Ubuntu 20.0 LTS
 - Insomnia
 - Knex
 - Javascript
 - SQL