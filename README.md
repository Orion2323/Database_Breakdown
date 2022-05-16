# *Database Breakdown Repo*
## **Additions to this branch**
The concept of middleware is implemented in this branch. Middleware acts as a bridge between an application's request and the database's response, making data management across systems more efficient.

The models folder houses JavaScript files pertaining to a specific resource, where within each file there is code that communicates directly with a database.

The routes folder houses Javascript files pertaining to a specific resource.

Route responses now return with a status code to reflect whether route was executed correctly or not. Below are the lists of error codes commonly used:

<details open> 
<summary> 200's</summary>

- 200: Success. Usually returns a payload.
- 201: Successfully created a resource and returns said resorce.
- 204: Success but does not return a payload.
</details>

<details open>
    <summary> 400's </summary>

- 400: Bad Request. Something about the request was malformed, or in a format the server doens't understand.<br>
- 401: Unauthorized. The user needs to authenticate themselves and try again.<br>
- 403: Forbidden. The user is authenticated, but is not allowed to access this resource.<br>
- 404: Not Found: Either the route doesn't exist, or you're accessing a resource that doesn't exist.<br>
- 409: Conflict. The request would cause some internal conflict, such as trying to create resources with duplicate primary keys.<br>
</details>

<details open> 
    <summary> 500's </summary>

- 500: Internal Server Error: Some application-level code failed.<br>
- 502: Bad Gateway. The server took in the request but gave an invalid response or error<br>
- 504: Timeout Error: The server took too long to respond after a certain time.<br>
</details>

## **To run program**
Before running program, verify that your Ubuntu account data is correct in 'connect-to-database.js'.
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

## **Technologies/Tools/Languages Used**
 - Ubuntu 20.0 LTS
 - Insomnia
 - Javascript
 - SQL