const UserModel = require('../models/users');
const CourseModel = require('../models/course');

// method to get all courses assigned to user email
const fetchYourCourses = async(email) => {
    // check if email is not empty
    if (email == null || email == undefined || email.length == 0) {
        return {
            status: 400,
            error: 'Email is required'
        }
    }

    // check if user email exists in database
    const userExists = await UserModel.findUserByEmail(email);
    if (userExists.length == 0) {
        return {
            status: 404,
            error: 'User does not exist'
        }
    }

    const result = await CourseModel.fetchYourCourses(email);
    if (result.length == 0) {
        return {
            status: 404,
            error: 'No courses found under your name'
        }
    } else {
        // return list of course names
        var courses = [];

        for (var i = 0; i < result.length; i++) {
            const course = {course_name: result[i].course_name};
            courses[i] = course;
        }

        return courses;
    }
};

// method to get all courses
const createNewCourse = async(name,email) => {
    // check if name is not empty
    if (name == null || name == undefined || name.length == 0) {
        return {
            status: 400,
            error: 'Name is required'
        }
    } else if (email == null || email == undefined || email.length == 0) {
        return {
            status: 400,
            error: 'Email is required'
        }
    }

    // check if user email exists in database
    const userExists = await UserModel.findUserByEmail(email);
    if (userExists.length == 0) {
        return {
            status: 404,
            error: 'User does not exist'
        }
    }

    // check if course name already exists
    const courseExists = await CourseModel.findCourseByName(name);
    if (courseExists.length != 0) {
        return {
            status: 409,
            error: 'Course already exists'
        }
    }

    // create course and return information
    const result = await CourseModel.createNewCourse(name,email);
    return {
        course_name: name,
        prof_email: email
    };
}

// method to drop a course
const dropCourse = async(name,email) => {
    // chekc if name is not empty
    if (name == null || name == undefined || name.length == 0) {
        return {
            status: 400,
            error: 'Name is required'
        }
    } else if (email == null || email == undefined || email.length == 0) {
        return {
            status: 400,
            error: 'Email is required'
        }
    }

    // check if user email exists in database
    const userExists = await UserModel.findUserByEmail(email);
    if (userExists.length == 0) {
        return {
            status: 404,
            error: 'User does not exist'
        }
    }

    // check if course exists
    const courseExists = await CourseModel.findCourseByName(name);
    if (courseExists.length == 0) {
        return {
            status: 404,
            error: 'Course does not exist'
        }
    }

    // check if course is assigned to user
    const yourCourses = await CourseModel.fetchYourCourses(email);

    // check if course is in JSON list of courses
    var ifYourCourse = false;
    for (var i = 0; i < yourCourses.length; i++) {
        if (yourCourses[i].course_name == name) {
            ifYourCourse = true;
            break;
        }
    }

    // check if course is assigned to user
    if (!ifYourCourse) {
        return {
            status: 403,
            error: 'Course is not assigned to you'
        }
    }

    // drop course and return information
    const result = await CourseModel.dropCourse(name,email);
    return result;
}

module.exports = {
    fetchYourCourses,
    createNewCourse,
    dropCourse
}