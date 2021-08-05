
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'bank',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    const insert_account_query = `INSERT INTO account VALUES
        (101, 5000),
        (102, 7000)
    `;
    const insert_account_changes_query = `INSERT INTO account_changes VALUES
        (1111, 101, -50, '2021-03-11', 'withdrawal'),
        (1112, 102, 10, '2021-04-15', 'refund')
    `;
    await Promise.all([execQuery(insert_account_query), execQuery(insert_account_changes_query)])

  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
