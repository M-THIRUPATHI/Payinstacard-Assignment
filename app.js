const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");

let db = new sqlite3.Database(
  "./userdetails.db",
  sqlite3.OPEN_READWRITE,
  (error) => {
    if (error) return console.error(error.message);
    console.log("Connected to the database.");
  }
);

app.listen(4000, () => {
  console.log("Server Running at http://localhost:4000");
});

app.post("/register", async (request, response) => {
  const { username, email } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);

  const selectUserQuery = `SELECT * FROM userdetails WHERE username = ?`;

  db.get(selectUserQuery, [username], (error, dbUser) => {
    if (error) {
      response.status(500).send("Error querying the database.");
    } else {
      if (!dbUser) {
        const createUserQuery = `
          INSERT INTO 
            userdetails (username, email, password) 
          VALUES 
            (?, ?, ?)`;

        db.run(
          createUserQuery,
          [username, email, hashedPassword],
          function (error) {
            if (error) {
              response.status(500).send("Error creating user.");
            } else {
              response.send("Register Successfully");
            }
          }
        );
      } else {
        response.status(400).send("User already exists");
      }
    }
  });
});

app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const selectQuery = `SELECT * FROM userdetails WHERE username=?`;

  db.get(selectQuery, [username], async (error, dbUser) => {
    if (error) {
      response.status(500).send("Error querying the database.");
    } else {
      if (dbUser === undefined) {
        response.status(400);
        response.send("Please Register First");
      } else {
        const isPasswordMatch = await bcrypt.compare(password, dbUser.password);
        if (isPasswordMatch === true) {
          const payload = {
            username: username,
          };
          const jwtToken = jwt.sign(payload, "JWT_TOKEN");
          response.send({ jwtToken });
        } else {
          response.status(400);
          response.send("Invalid username or password");
        }
      }
    }
  });
});

table = `SELECT * FROM userdetails`;
db.all(table, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});

module.exports = app;
