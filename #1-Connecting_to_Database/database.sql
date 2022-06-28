-- create database to host data
CREATE DATABASE IF NOT EXISTS 'db';

-- create student table
-- each student will have a unique id and name
CREATE TABLE IF NOT EXISTS student(
    id INTEGER AUTO_INCREMENT, 
    name VARCHAR(30),

    PRIMARY KEY(ID)
);

-- create course table
-- each course will have a unique id and name
CREATE TABLE IF NOT EXISTS course(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),

    PRIMARY KEY(ID)
);

-- insert students into database
INSERT INTO student (name)
VALUES
('John'),
('Jane'),
('Mary');

-- insert courses into database
INSERT INTO course (name)
VALUES
('CS 101'),
('MATH 332'),
('CS 200');

-- SELECT statement returns all current records in the student table
SELECT * FROM student;

-- SELECT statement returns all curent records in the course table
SELECT * FROM course;

-- to clear both tables
DELETE FROM student;
DELETE FROM course;