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
    await execQuery("START TRANSACTION");

    const acc_changes_101 = `INSERT INTO account_changes VALUES(1113, 101, -1000, '2021-08-10', 'transfer to 102')`;
    const acc_changes_102 = `INSERT INTO account_changes VALUES(1114, 102, 1000, '2021-08-10', 'transfer from 101')`;
    const balance_update_101 = `UPDATE account SET balance=balance-1000 WHERE account_number=101`;
    const balance_update_102 = `UPDATE account SET balance=balance+1000 WHERE account_number=102`;
    
    await Promise.all([
        execQuery(acc_changes_101),
        execQuery(acc_changes_102),
        execQuery(balance_update_101),
        execQuery(balance_update_102)
    ]);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
  }

  connection.end();
}

seedDatabase();
