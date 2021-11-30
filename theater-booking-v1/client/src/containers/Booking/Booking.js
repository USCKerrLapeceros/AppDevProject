import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../lib/Constants";
import { Button } from "react-bootstrap";
import AVENGERS_ENDGAME from "../../images/avengers_endgame.jpg";
import SPIDERMAN_NO_WAY_HOME from "../../images/spiderman.jpg";
import IRON_MAN3 from "../../images/iron_man3.jpg";
import NOT_FOUND from "../../images/not_found.jpg";
import BookingModal from "../../components/BookingModal/BookingModal";
import { ToastContainer, toast } from "react-toastify";
import "./Booking.css";

export default function Booking() {
  const [bookingList, setBookingList] = useState([]);
  const [seatCode, setSeatCode] = useState("");
  const [bookingID, setBookingID] = useState("");
  const [seatID, setSeatID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userID, setUserID] = useState(sessionStorage.getItem("userId"));

  useEffect(() => {
    onLoadBookings();
  });

  const onLoadBookings = () => {
    Axios.get(API_URL + "bookings", {
      params: {
        userID: userID,
      },
    }).then((response) => {
      setBookingList(response.data);
    });
  };

  const getImage = (id) => {
    let image = "";
    switch (id) {
      case 1:
        image = AVENGERS_ENDGAME;
        break;
      case 2:
        image = SPIDERMAN_NO_WAY_HOME;
        break;
      case 3:
        image = IRON_MAN3;
        break;
      default:
        image = NOT_FOUND;
    }

    return image;
  };

  const cancelBooking = (seatCode, bookingID, seatID) => {
    setShowModal(true);
    setSeatCode(seatCode);
    setBookingID(bookingID);
    setSeatID(seatID);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const cancelBook = () => {
    Axios.post(API_URL + "cancel-booking", {
      bookingID: bookingID,
      seatID: seatID,
    }).then((response) => {
      console.log(response);
      if ("Deleted Successfully" === response.data.message) {
        toast.info(seatCode + " has been successfully cancelled.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onLoadBookings();
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
  return (
    <div className="dashboard">
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
      <BookingModal
        title={"Cancel Booking for " + seatCode}
        show={showModal}
        handleSubmit={cancelBook}
        handleClose={handleClose}
        message={"Do you want to cancel this booking?"}
        submitText={"Yes"}
        variant="danger"
      />
      <div className="main">
        <h1>My Bookings</h1>
        <div className="booking-main">
          {0 === bookingList.length && <h3>No bookings</h3>}
          {bookingList.map((booking, index) => {
            return (
              <div className="booking-row" key={index}>
                <div>
                  <img
                    className="movie-image"
                    src={getImage(booking.MovieID)}
                    key={index}
                    alt={booking.MovieName}
                  />
                </div>

                <div className="movie-description">
                  <h4>Seat# {booking.SeatCode}</h4>
                  <h3>{booking.MovieName}</h3>
                  <p>{booking.MovieDescription}</p>
                  <Button
                    variant="danger"
                    onClick={() => {
                      cancelBooking(
                        booking.SeatCode,
                        booking.BookingID,
                        booking.SeatID
                      );
                    }}
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
