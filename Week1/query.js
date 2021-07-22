module.exports = {
  meetupDatabase: 'DROP DATABASE IF EXISTS meetup; CREATE DATABASE meetup; USE meetup;',
  /* we can make invited_by int referencing to foreign key from other table */
  invitee : `CREATE TABLE invitee (
    invitee_no INT PRIMARY KEY AUTO_INCREMENT ,
    invitee_name VARCHAR(50),
    invited_by VARCHAR(20));`,
  room : `CREATE TABLE room (
    room_no INT PRIMARY KEY AUTO_INCREMENT ,
    room_name VARCHAR(50),
    floor_number SMALLINT);`,
    /* we can also make a foreign key constraint on room_no to make it references to room_no column on room table */
  meeting : `CREATE TABLE meeting (
    meeting_no INT PRIMARY KEY AUTO_INCREMENT ,
    meeting_title VARCHAR(150),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT);`,
}
