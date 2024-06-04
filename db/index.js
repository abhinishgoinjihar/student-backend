const mysql = require("mysql");
const fs = require("fs");

require("dotenv").config();

/**
 * @type {import("mysql").ConnectionConfig} - MySQL Connection
 */
const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  port: Number(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: true,
};

const connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.log("Cannot establish a connection with the database.");
  } else {
    console.log("New connection established with the database.");
  }
});

function runMigration() {
  const migrationFile = fs.readFileSync(__dirname + "/migration.sql", {
    encoding: "utf-8",
  });

  connection.query(migrationFile.replace(/\s+/g, " ").trim(), function (err) {
    if (err) throw err;

    console.log("Migration run successfully");
  });
}

module.exports = { connection, runMigration };
