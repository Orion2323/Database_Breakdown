SELECT * FROM db.student;
SELECT * FROM db.course;
SELECT * FROM newDB.enrollment;

CREATE TABLE professor_user (
    name        VARCHAR(30),
    email       VARCHAR(50),
    password    VARCHAR(100),
    salt        VARCHAR(100),

    PRIMARY KEY(email)
);

CREATE TABLE course (
  course_name   VARCHAR(30),
  prof_email    VARCHAR(50),

  PRIMARY KEY(course_name),
  FOREIGN KEY(prof_email) REFERENCES professor_user(email)
);

CREATE TABLE enrollment(
    enrollment_id   INTEGER AUTO_INCREMENT,
    student_email   VARCHAR(50),
    course_name     VARCHAR(30),

    PRIMARY KEY(enrollment_id),
    FOREIGN KEY(student_email) REFERENCES student_user(email),
    FOREIGN KEY(course_name) REFERENCES course(course_name)
);