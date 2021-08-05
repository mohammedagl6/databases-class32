
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});



function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0]?.Population);
        conn.end();
      }
    );
  }


  function showResult(err, result){
    if ( err ){
        throw err;
    }
    console.log(result);
  }

  getPopulation('country', 'test', "test' OR '1=1", showResult);
  /* We can't make this function to return all the records by sql injection
     because the function only shows the first record (result[0]) so we can only hack the first record */


// To make it secured from sql injection we can rewrite it as follows;

function getPopulation2(Country, name, code, cb) {
    name = conn.escape(name);
    code = conn.escape(code);
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = ${name} and code = ${code}`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0]?.Population);
        conn.end();
      }
    );
  }

//   getPopulation2('country', 'test', "test' OR '1=1", showResult);