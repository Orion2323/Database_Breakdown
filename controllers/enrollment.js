const EnrollmentModel = require('../models/enrollment');
const CourseModel = require('../models/course');

// method that gets all students enroled in a course
const fetchCourseStudents = async (courseName) => {
    // check if courseName is not empty
    if (courseName == null || courseName == undefined || courseName.length == 0) {
        return {
            status: 400,
            error: 'Course name is required'
        }
    }

    // check if course exists
    const courseExists = await CourseModel.findCourseByName(courseName);
    if (courseExists.length == 0) {
        return {
            status: 404,
            error: 'Course does not exist'
        }
    }

    // fetch all students enrolled in course
    const result = await EnrollmentModel.fetchCourseStudents(courseName);

    // check if any students enrolled in course
    if (result.length == 0) {
        return {
            status: 404,
            error: 'No students enrolled in this course'
        }
    }
    
    // return list of students
    var students = [];
    for (var i = 0; i < result.length; i++) {
        students.push(result[i].student_email);
    }

    return students;
}

module.exports = {
    fetchCourseStudents
}
