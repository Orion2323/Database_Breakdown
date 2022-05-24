const knex = require("../database/knex");

const COURSE_TABLE = "course";

// method to get all courses
const fetchAllCourses = async () => {
    const result = await knex(COURSE_TABLE);

    // check if there are any courses
    if (result.length == 0) {
        return {
            status: 404,
            error: "No courses found"
        }
    }

    return result;
}

// method to check if course exists
const findCourseByName = async (name) => {
    // check if courseName is not empty
    if (name == null || name == undefined || name.length == 0) {
        return {
            status: 400,
            error: "Course name is required"
        }
    }

    const result = await knex(COURSE_TABLE).where({name});
    return result;
}

module.exports = {
    fetchAllCourses,
    findCourseByName
}