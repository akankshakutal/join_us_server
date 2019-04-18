const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT || 8000;
const app = express();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

const urlParser = function(url) {
  return url.split("/")[2];
};

const insertData = function(req, res) {
  const person = {
    email: urlParser(req.url)
  };
  connection.query("INSERT INTO users SET ?", person, function(err, result) {
    if (err) throw err;
    const q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results) {
      if (err) throw err;
      let count = results[0].count;
      res.send("" + count);
    });
  });
};

const getData = function(req, res) {
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function(err, results) {
    if (err) throw err;
    let count = results[0].count;
    res.send("" + count);
  });
};

app.get(/\/join_us\/*/, insertData);
app.get("/hello", getData);
app.use(express.static(__dirname + "/join_us_client/build"));

app.listen(port, () =>
  console.log("Express server is running on localhost:8000")
);
