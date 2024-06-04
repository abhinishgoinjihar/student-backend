const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "12345",
  database: "student_management_system",
});

function reconnect(connection) {
  console.log("\n New connection tentative...");

  //- Destroy the current connection variable
  if (connection) connection.destroy();

  //- Create a new one
  var connection = mysql_npm.createConnection(db_config);

  //- Try to reconnect
  connection.connect(function (err) {
    if (err) {
      //- Try to connect every 2 seconds.
      setTimeout(reconnect, 2000);
    } else {
      console.log("New connection established with the database.");
      return connection;
    }
  });
}

connection.connect(function (err) {
  if (err) {
    console.log("Cannot establish a connection with the database.");

    connection = reconnect(connection);
  } else {
    console.log("New connection established with the database.");
  }
});

function runMigration() {
  const migrationFile = fs.readFileSync(__dirname + "/migration.sql", {
    encoding: "utf-8",
  });

  connection.query(migrationFile.toString(), function (err, result) {
    if (err) throw err;

    console.log("Migration run successfully");
  });
}

module.exports = { connection, runMigration };
