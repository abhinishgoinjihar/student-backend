const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const { runMigration } = require("./db");

const app = express();

app.use(bodyParser.json());

app.use(cors());

runMigration();

app.use("/api", routes);

app.listen(8081, () => {
  console.log("Server listening at http://localhost:8081");
});
