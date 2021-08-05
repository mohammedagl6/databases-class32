
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
    const create_account_query = 'CREATE TABLE IF NOT EXISTS account(account_number INT PRIMARY KEY, balance DECIMAL(10, 2))';
    const create_account_changes_query = `CREATE TABLE IF NOT EXISTS account_changes(
        change_number INT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date DATETIME,
        remark VARCHAR(255),
        FOREIGN KEY(account_number) REFERENCES account(account_number)
        )`
    await execQuery(create_account_query);
    await execQuery(create_account_changes_query);

  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
