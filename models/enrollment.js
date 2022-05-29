const knex = require('../database/knex');
const courseModel = require('../models/course');

const ENROLL_TABLE = 'enrollment';

// method to get all students enrolled in a course
const fetchCourseStudents = async (course_name) => {
    const result = await knex(ENROLL_TABLE).where({course_name});
    return result;
}

module.exports = {
    fetchCourseStudents,
}