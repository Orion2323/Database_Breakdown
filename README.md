# Database_Breakdown Repo
The purpose of this repo is to breakdown the content of the Database Concepts class CS 3330.
Each branch represents the development of setting up and interacting with a database. 

# To run program
Before running program, verify that account data is correct in 'connect-to-database.js'
Run the following command on the terminal
```
node connect-to-database.js
```
Each step and their results will appear on terminal as they execute. Assuming no errors, the program will display the successful results of all steps before successfully closing connection to database.

## File Descriptions
- .gitignore: file used to specify others files Github ignores

- connect-to-database.js: file that holds main code for connecting to database, creating tables, populating tables, then clearing them before closing connection to database

- database_db.sql: A SQL file used to verify that code in connect-to-database.js works

- package-lock.json/package.json: JSON file that holds all dependencies needed for current code

## Technologies/Tools Used
The result of these branches are based from a Windows machine. Set up and project running may differ for other Operating Systems.

 - Ubuntu 20.0 LTS
 - Javascript
 - SQL