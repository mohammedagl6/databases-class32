const util = require('util');
const mysql = require('mysql');
const queries = require('./worldQuery');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser', 
  password: 'hyfpassword',
  multipleStatements: true,
});


const execProcess = util.promisify(require("child_process").exec);


const execQuery = util.promisify(connection.query.bind(connection));

const queryWorld = async ()  => {
  
  connection.connect();
    try {
        await execQuery('DROP DATABASE IF EXISTS world; CREATE DATABASE world; USE world;');
        const cmdLine = "/usr/local/mysql/bin/mysql --user=hyfuser --password=hyfpassword world < world.sql";
        await execProcess(cmdLine); 
        let no = 0; 
        const results = await Promise.all(queries.map(
            query => {
                no++;
                return execQuery(query[`q${no}`]);
            }),
            );

        console.log(results);
        
    } catch (error) {
        console.error(error);
    }
  connection.end();
}

queryWorld();
