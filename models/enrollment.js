const knex = require('../database/knex');
const courseModel = require('../models/course');

const ENROLL_TABLE = 'enrollment';

// method that creates a new enrollment
const createNewEnrollment = async (student_email,course_name) => {
    // check if userID and courseID is not empty 
    if (student_email== null || student_email == undefined || student_email.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    } else if (course_name == null || course_name == undefined || course_name.length == 0) {
        return {
            status: 400,
            error: 'Course name is required'
        }
    }

    // check if course exists
    const courseExists = await courseModel.findCourseByName(course_name);
    if (courseExists.length == 0) {
        return {
            status: 404,
            error: 'Course does not exist'
        }
    }

    // check if enrollment already exists
    const ifExists = await findEnrollmentByUserIdAndCourseId(student_email,course_name);
    if (ifExists.length > 0) {
        return {
            status: 409,
            error: 'Enrollment already exists'
        }
    }

    // code executes if no errors have been found
    const result = await knex(ENROLL_TABLE).insert({student_email,professor_email: courseExists[0].prof_email,course_name});
    return {
        enrollment_id: result[0],
        student_email,
        professor_email: courseExists[0].prof_email,
        course_name
    }
}

// method that checks if an enrollment exists
const findEnrollmentByUserIdAndCourseId = async (student_email,course_name) => {
    // check if userEmail and courseName is not empty
    if (student_email == null || student_email == undefined || student_email.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    } else if (course_name == null || course_name == undefined || course_name.length == 0) {
        return {
            status: 400,
            error: 'Course name is required'
        }
    }

    // code executes if no errors have been found
    const result = await knex(ENROLL_TABLE).where({student_email,course_name});
    return result;
}

// method to get all courses user enrolled in
const fetchEnrolledCourses = async (student_email) => {
    // check if userEmail is not empty
    if (student_email == null || student_email == undefined || student_email.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    }

    // check if user has enrolled in any courses
    const result = await knex(ENROLL_TABLE).where({student_email});
    if (result.length == 0) {
        return {
            status: 404,
            error: 'No enrolled courses'
        }
    }

    return result;
}

// method to delete an enrollment
const dropCourse = async (student_email,course_name) => {
    // check if userEmail and courseName is not empty
    if (student_email == null || student_email == undefined || student_email.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    } else if (course_name == null || course_name == undefined || course_name.length == 0) {
        return {
            status: 400,
            error: 'Course name is required'
        }
    }

    // check if course exists
    const courseExists = await courseModel.findCourseByName(course_name);
    if (courseExists.length == 0) {
        return {
            status: 404,
            error: 'Course does not exist'
        }
    }

    // check if enrollment exists
    const enrollExists = await knex(ENROLL_TABLE).where({student_email,course_name});
    if (enrollExists.length == 0) {
        return {
            status: 404,
            error: 'User is not enrolled to this course'
        }
    }

    // code executes if no errors have been found
    const result = await knex(ENROLL_TABLE).where({student_email,course_name}).del();
    return result;
}

module.exports = {
    createNewEnrollment,
    findEnrollmentByUserIdAndCourseId,
    fetchEnrolledCourses,
    dropCourse
}