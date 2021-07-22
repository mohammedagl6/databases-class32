const util = require('util');
const mysql = require('mysql');
const {meetupDatabase, invitee, room, meeting} = require('./query');
const {inviteeData, roomData, meetingData} = require('./data');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser', 
  password: 'hyfpassword',
  multipleStatements: true,
});

const execQuery = util.promisify(connection.query.bind(connection));

const createFeedDatabase = async ()  => {
  
  connection.connect();
    try {
        await execQuery(meetupDatabase);
        // await execQuery(createDatabase);
        // await execQuery(useDatabase);
        await Promise.all[execQuery(invitee), execQuery(room), execQuery(meeting)];
        await Promise.all(inviteeData.map(
         invitee => execQuery('INSERT INTO invitee SET ?', invitee)),
         roomData.map(room => execQuery('INSERT INTO room SET ?', room)),
         meetingData.map(meeting => execQuery('INSERT INTO meeting SET ?', meeting)),
         );
    } catch (error) {
        console.error(error);
    }
  connection.end();
}

createFeedDatabase();
