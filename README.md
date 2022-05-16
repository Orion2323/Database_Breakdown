# *Database_Breakdown Repo*

## **Additions to this branch**
Instead of having the program automatically connect to the database, execute SQL queries, then disconnect, now we can have the program execute according to the user's request and execution of routes.

A route is simply a data pipeline for a user's request that connects to a database.

## **To run program**
Before running program, verify that your Ubuntu account data is correct in 'connect-to-database.js'.
Run the following command on the terminal
```
node index.js
```
Each step and their results will appear on terminal as they execute. Assuming no errors, the program will display the successful results of all steps and the overall route as they as executed on Insomnia.

## **File Descriptions**
- .gitignore: file used to specify which files Github ignores.

- connect-to-database.js: file that holds main code for connecting and disconnecting from database.

- index.js: file that holds code for routes to be executed in Insomnia.

- database_db.sql: A SQL file used to verify that code in index.js works.

- API Documentation: documentation for current routes on branch

- package-lock.json/package.json: JSON file that holds all dependencies needed for current code.

## **Technologies/Tools/Languages** Used
 - Ubuntu 20.0 LTS
 - Insomnia
 - Javascript
 - SQL