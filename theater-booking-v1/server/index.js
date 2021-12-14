const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const API = "/api";

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "theater-booking",
});

app.post(API + "/register", (req, res) => {
  const userName = req.body.userName;
  const userContactNumber = req.body.userContactNumber;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  db.query(
    "INSERT INTO users (UserName, UserContactNumber, UserEmail, UserPassword) VALUES (?,?,?,?)",
    [userName, userContactNumber, userEmail, userPassword],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "An error occured. Please check your details again.",
        });
      } else {
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "An unexpected error has occured." });
        }
      }
    }
  );
});

app.post(API + "/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users where UserEmail = ? and UserPassword = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({
          message: "An error occured. Please check your details again.",
        });
      } else {
        if (0 < result.length) {
          res.send(result);
        } else {
          res.send({ message: "Incorrect Credentials" });
        }
      }
    }
  );
});

app.get(API + "/movie-seats", (req, res) => {
  const movieId = req.query.movieId;
  db.query("SELECT * FROM seat where MovieID = ?", [movieId], (err, result) => {
    res.send(result);
  });
});

app.get(API + "/movie-seats-available", (req, res) => {
  const movieId = req.query.movieId;
  db.query(
    "SELECT COUNT(*) as count from seat where SeatAvailability = 0 and MovieID = ?",
    [movieId],
    (err, result) => {
      res.send(result);
    }
  );
});

app.get(API + "/movie-seats-unavailable", (req, res) => {
  const movieId = req.query.movieId;
  db.query(
    "SELECT COUNT(*) as count from seat where SeatAvailability = 1 and MovieID = ?",
    [movieId],
    (err, result) => {
      res.send(result);
    }
  );
});

app.get(API + "/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    res.send(result);
  });
});

app.get(API + "/bookings", (req, res) => {
  const userID = req.query.userID;
  db.query(
    "SELECT s.SeatCode, m.MovieName, m.MovieDescription, m.MovieID, b.BookingID, s.SeatID FROM seat s, movies m, bookings b WHERE m.MovieID = s.MovieID AND s.SeatID = b.SeatID AND b.UserID = ? ORDER BY s.SeatID ASC",
    [userID],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post(API + "/book-movie", (req, res) => {
  const userID = req.body.userID;
  const seatID = req.body.seatID;

  db.query(
    "UPDATE seat SET SeatAvailability = 1 where SeatID = ?",
    [seatID],
    (err, result) => {
      if (err) {
        res.send({
          message: "An error occured. Please check your details again.",
        });
      } else {
        if (0 < result.changedRows) {
          db.query(
            "INSERT INTO bookings (UserID, SeatID) VALUES (?,?)",
            [userID, seatID],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({
                  message: "An error occured. Please check your details again.",
                });
              } else {
                if (result) {
                  res.send(result);
                } else {
                  res.send({ message: "An unexpected error has occured." });
                }
              }
            }
          );
        }
      }
    }
  );
});

app.post(API + "/cancel-booking", (req, res) => {
  const bookingID = req.body.bookingID;
  const seatID = req.body.seatID;

  db.query(
    "DELETE FROM bookings where BookingID = ?",
    [bookingID],
    (err, result) => {
      if (err) {
        res.send({
          message: "An error occured. Please check your details again.",
        });
      } else {
        if (0 < result.affectedRows) {
          db.query(
            "UPDATE seat SET SeatAvailability = 0 where SeatID = ?",
            [seatID],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({
                  message: "An error occured. Please check your details again.",
                });
              } else {
                if (result) {
                  result.message="Deleted Successfully";
                  res.send(result);
                } else {
                  res.send({ message: "An unexpected error has occured." });
                }
              }
            }
          );
        }
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 30001");
});
