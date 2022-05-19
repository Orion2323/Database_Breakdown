const knex = require('../database/knex');
const courseModel = require('../models/course');

const ENROLL_TABLE = 'enrollment';

// method that creates a new enrollment
const createNewEnrollment = async (userEmail,courseName) => {
    // check if userID and courseID is not empty 
    if (userEmail== null || userEmail == undefined || userEmail.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    } else if (courseName == null || courseName == undefined || courseName.length == 0) {
        return {
            status: 400,
            error: 'Course name is required'
        }
    }

    // check if course exists
    const courseExists = await courseModel.findCourseByName(courseName);
    if (courseExists.length == 0) {
        return {
            status: 404,
            error: 'Course does not exist'
        }
    }

    // check if enrollment already exists
    const ifExists = await findEnrollmentByUserIdAndCourseId(userEmail,courseName);
    if (ifExists.length > 0) {
        return {
            status: 409,
            error: 'Enrollment already exists'
        }
    }

    // code executes if no errors have been found
    const result = await knex(ENROLL_TABLE).insert({student_email: userEmail,course_name: courseName});
    return {
        enrollment_id: result[0].enrollment_id,
        student_email: userEmail,
        course_name: courseName
    }
}

// method that checks if an enrollment exists
const findEnrollmentByUserIdAndCourseId = async (userEmail, courseName) => {
    // check if userEmail and courseName is not empty
    if (userEmail == null || userEmail == undefined || userEmail.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    } else if (courseName == null || courseName == undefined || courseName.length == 0) {
        return {
            status: 400,
            error: 'Course name is required'
        }
    }

    // code executes if no errors have been found
    const result = await knex(ENROLL_TABLE).where({student_email: userEmail, course_name: courseName});
    return result;
}

// method to get all courses user enrolled in
const fetchEnrolledCourses = async (userEmail) => {
    // check if userEmail is not empty
    if (userEmail == null || userEmail == undefined || userEmail.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    }

    // check if user has enrolled in any courses
    const result = await knex(ENROLL_TABLE).where({student_email: userEmail});
    if (result.length == 0) {
        return {
            status: 404,
            error: 'No enrolled courses'
        }
    }

    return result;
}

// method to delete an enrollment
const dropCourse = async (userEmail,courseName) => {
    // check if userEmail and courseName is not empty
    if (userEmail == null || userEmail == undefined || userEmail.length == 0) {
        return {
            status: 400,
            error: 'User email is required'
        }
    } else if (courseName == null || courseName == undefined || courseName.length == 0) {
        return {
            status: 400,
            error: 'Course name is required'
        }
    }

    // check if course exists
    const courseExists = await courseModel.findCourseByName(courseName);
    if (courseExists.length == 0) {
        return {
            status: 404,
            error: 'Course does not exist'
        }
    }

    // check if enrollment exists
    const enrollExists = await knex(ENROLL_TABLE).where({student_email:userEmail,course_name: courseName});
    if (enrollExists.length == 0) {
        return {
            status: 404,
            error: 'User is not enrolled to this course'
        }
    }

    // code executes if no errors have been found
    const result = await knex(ENROLL_TABLE).where({student_email: userEmail,course_name: courseName}).del();
    return result;
}

module.exports = {
    createNewEnrollment,
    findEnrollmentByUserIdAndCourseId,
    fetchEnrolledCourses,
    dropCourse
}