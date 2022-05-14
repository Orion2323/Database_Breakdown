class Student {
    constructor(DBQuery, disconnect) {
        this.DBQuery = DBQuery;
        this.disconnect = disconnect;
    }

    close() {
        this.disconnect();
    }

    // method that returns all students in database
    async fetchAllStudents() {
        const results = await this.DBQuery('SELECT * FROM student');

        // check if there are any students in database
        if (results.length == 0) {
            return {
                error : "No students registered"
            }
        }

        return results;
    }

    // method to return student by id
    async fetchStudentById(id) {
        let results;

        // check if id is null
        if (id == null || id.length == 0 || id == undefined) {
            return {
                error : "Input an id"
            }
        }
        
        // check any students have id
        results = await this.DBQuery('SELECT * FROM student WHERE id = ?', [id]);
        if (results.length == 0) {
            return {
                error : "Student id not found"
            }
        }

        return results[0];
    };

    // method to return student(s) by name
    async fetchStudentByName(name) {
        let results;

        // check if name is null
        if (name == null || name.length == 0 || name == undefined) {
            return {
                error : "Input a name"
            }
        }

        // check whether any students have specified name
        results = await this.DBQuery('SELECT * FROM student WHERE name = ?', [name]);
        if (results.length == 0) {
            return {
                error : "Student name not found"
            }
        }

    
        return results;
    };

    // method to create a student
    async createStudent(name) {
        let results;
        
        // check if name is null
        if (name == null || name.length == 0 || name == undefined) {
            return {
                error : "Input a name"
            };
        }

        results = await this.DBQuery('INSERT INTO student (name) VALUES (?)', [name]);
        return {
            id: results.insertId,
            name
        }
    }

    // method to delete student by ID
    async deleteStudent(id) {
        const results = await this.DBQuery('DELETE FROM student WHERE id = ?', [id]);
        
        // check whether student was deleted
        if (results.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Student;