class Course {
    constructor(DBQuery, disconnect) {
        this.DBQuery = DBQuery;
        this.disconnect = disconnect;
    }

    close() {
        this.disconnect();
    }

    // method that returns all courses in database
    async fetchAllCourses() {
        const results = await this.DBQuery('SELECT * FROM course');

        // check if there are any courses in database
        if (results.length == 0) {
            return {
                error : "No courses registered"
            }
        }

        return results;
    }

    // method to return course by id
    async fetchCourseById(id) {
        // check if id is null
        if (id == null || id.length == 0 || id == undefined) {
            return {
                error : "Input an id"
            }
        }

        // check whether any courses have specified id
        const results = await this.DBQuery('SELECT * FROM course WHERE id = ?', [id]);
        if (results.length == 0) {
            return {
                error : "Course id not found"
            }
        }

        return results[0];
    };

    // method to return course by name
    async fetchCourseByName(name) {
        // check if name is null
        if (name == null || name.length == 0 || name == undefined) {
            return {
                error : "Input a name"
            }
        }

        // check whether any courses have specified name
        const results = await this.DBQuery('SELECT * FROM course WHERE name = ?', [name]);
        if (results.length == 0) {
            return {
                error : "Course name not found"
            }
        }

        return results[0];
    };

    // method to create a course
    async createCourse(name) {
        let results;

        // check if name is null
        if (name == null || name.length == 0 || name == undefined) {
            return {
                error : "Input a name"
            }
        }

        // check if course already exists
        results = await this.DBQuery('SELECT * FROM course WHERE name = ?', [name]);
        if (results.length > 0) {
            return {
                error : "Course name already exists"
            }
        }

        // create new course
        results = await this.DBQuery('INSERT INTO course (name) VALUES (?)', [name]);
        return {
            id : results.insertId,
            name
        }
    }

    // method to delete course by ID
    async deleteCourse(id) {
        const results = await this.DBQuery('DELETE FROM course WHERE id = ?', [id]);

        // check whether course was deleted
        if (results.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Course;