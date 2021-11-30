import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../lib/Constants";
import GreenSeat from "../../images/green_seat.png";
import RedSeat from "../../images/red_seat.png";
import BookingModal from "../../components/BookingModal/BookingModal";
import { Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css";

export default function Dashboard() {
  const [movieSeatList, setMovieSeatList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [seatCode, setSeatCode] = useState("");
  const [seatID, setSeatID] = useState(0);
  const [selectedMovie, setSelectMovie] = useState("Avengers: Endgame");
  const [available, setAvailable] = useState(0);
  const [unavailable, setUnavailable] = useState(0);
  const [movieID, setMovieID] = useState(1);
  const [userID, setUserID] = useState(sessionStorage.getItem("userId"));

  useEffect(() => {
    onLoad(1);
    onLoadMovies();
  }, []);

  const onLoad = (movieID) => {
    Axios.get(API_URL + "movie-seats", {
      params: {
        movieId: movieID,
      },
    }).then((response) => {
      setMovieSeatList(response.data);
    });
    //get available
    Axios.get(API_URL + "movie-seats-available", {
      params: {
        movieId: movieID,
      },
    }).then((response) => {
      setAvailable(response.data[0].count);
    });

    //get unavailable

    Axios.get(API_URL + "movie-seats-unavailable", {
      params: {
        movieId: movieID,
      },
    }).then((response) => {
      setUnavailable(response.data[0].count);
    });
  };

  const onLoadMovies = () => {
    Axios.get(API_URL + "movies").then((response) => {
      setMoviesList(response.data);
    });
  };

  const showBookingModal = (movie) => {
    if (0 === movie.SeatAvailability) {
      setSeatCode(movie.SeatCode);
      setSeatID(movie.SeatID);
      setShowModal(true);
    } else {
      toast.error(movie.SeatCode + " is booked", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const bookMovie = () => {
    Axios.post(API_URL + "book-movie", {
      userID: userID,
      seatID: seatID,
    }).then((response) => {
      if ("" === response.data.message) {
        toast.success(seatCode + " has been successfully booked.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onLoad(movieID);
        setShowModal(false);
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const selectMovie = (e) => {
    const movieID = parseInt(e.target.value);
    const selectedMovie = moviesList.filter(
      (movie) => movie.MovieID === movieID
    )[0].MovieName;
    setSelectMovie(selectedMovie);
    setMovieID(movieID);
    onLoad(movieID);
  };

  return (
    <div className="dashboard">
      <BookingModal
        title={"Book Seat " + seatCode}
        show={showModal}
        handleSubmit={bookMovie}
        handleClose={handleClose}
        message={"Do you want to book this seat?"}
        submitText={"Book"}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="main">
        <h1>Dashboard</h1>

        <div className="screen-container">
          <div className="screen"></div>
        </div>
        <Row className="mainMovie">
          <Col className="selectMovie">
            <h6 className="pick-movie">Pick a movie:</h6>
            <select onChange={selectMovie}>
              {moviesList.map((movie, index) => {
                return (
                  <option key={index} value={movie.MovieID}>
                    {movie.MovieName}
                  </option>
                );
              })}
            </select>
          </Col>
          <Col className="selectedMovie">
            <h6>{selectedMovie} </h6>
            <h6>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Available:{" "}
              <span className="green">{available}</span>
            </h6>
            <h6>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unavailable:{" "}
              <span className="red">{unavailable}</span>
            </h6>
          </Col>
        </Row>
        <div className="seat-main">
          {movieSeatList.map((movie, idx) => {
            return (
              <div
                key={idx}
                className="seat-submain"
                onClick={() => {
                  showBookingModal(movie);
                }}
              >
                {0 === movie.SeatAvailability ? (
                  <img
                    src={GreenSeat}
                    key={idx}
                    className="seat-image"
                    alt=""
                  />
                ) : (
                  <img src={RedSeat} key={idx} className="seat-image" alt="" />
                )}
                <h5>{movie.SeatCode}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
