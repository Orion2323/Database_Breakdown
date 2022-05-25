const knex = require("../database/knex");

const COURSE_TABLE = "course";

// method to get all courses
const fetchAllCourses = async () => {
    const result = await knex(COURSE_TABLE);
    return result;
}

// method to fetch courses assigned to professor
const fetchYourCourses = async (prof_email) => {
    const result = await knex(COURSE_TABLE).where({prof_email});
    return result;
}

// method to check if course exists
const findCourseByName = async (course_name) => {
    const result = await knex(COURSE_TABLE).where({course_name});
    return result;
}

// method to create new course
const createNewCourse = async (course_name, prof_email) => {
    const result = await knex(COURSE_TABLE).insert({course_name, prof_email});
    return result;
}

// method to delete course
const dropCourse = async (course_name, prof_email) => {
    const result = await knex(COURSE_TABLE).where({course_name, prof_email}).del();
    return result;
}

module.exports = {
    fetchAllCourses,
    fetchYourCourses,
    findCourseByName,
    createNewCourse,
    dropCourse
}