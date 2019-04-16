const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT || 8000;
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ARK@2606",
  database: "join_us"
});

const urlParser = function(url) {
  return url.split("/")[3];
};

app.get(/api\/join_us\/*/, function(req, res) {
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
});

app.use(express.static(__dirname + "/public"));

app.listen(port, () =>
  console.log("Express server is running on localhost:8000")
);
