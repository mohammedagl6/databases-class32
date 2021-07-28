const util = require('util');
const mysql = require('mysql');
const queries = require('./queries');
const data = require('./data.js');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser', 
  password: 'hyfpassword',
  multipleStatements: true,
});



const execQuery = util.promisify(connection.query.bind(connection));

const createFeed = async ()  => {

  connection.connect();
    try {
        await execQuery('DROP DATABASE IF EXISTS researches; CREATE DATABASE researches; USE researches;');
        await execQuery(queries.ex1[0].Q1);
        await execQuery(queries.ex1[1].Q2);
        await execQuery(queries.ex2[0].Q1);
        await execQuery(queries.ex2[1].Q2);
        await Promise.all[execQuery(queries.ex2[2].Q3[0], [data.authors]), execQuery(queries.ex2[2].Q3[1], [data.papers])];
        await execQuery(queries.ex2[2].Q3[2], [data.junction]);

        let i = 0;
        const ex3 = queries.ex3.map(question => {
            i++;
            return question[`Q${i}`];
        });
        
        i=0;
        const ex4 = queries.ex4.map(question => {
            i++;
            return question[`Q${i}`];
        });
        
        const readingQueries = [...ex3, ...ex4];
        const results = await Promise.all(readingQueries.map(query => execQuery(query)));
        console.log(results);

    } catch (error) {
        console.error(error);
    }
  connection.end();
}

createFeed();