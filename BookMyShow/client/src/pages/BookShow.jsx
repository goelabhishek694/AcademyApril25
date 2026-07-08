import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/loaderSlice";
import { getShowById } from "../api/show";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { bookShow, makePayment } from "../api/booking";

function BookShow() {
  const { showId } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById(showId);
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
        dispatch(hideLoading());
        navigate("/");
      }
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onToken = async (token) => {
    console.log(token);
    try{
      dispatch(showLoading());
      const response = await makePayment(token, selectedSeats.length * show.ticketPrice * 100);
      if(response.success){
        confirmBooking(response.data);
      }else{
        message.error(response.message);
      }
      dispatch(hideLoading());

    }catch(err){
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const confirmBooking = async (transactionId) => {
    try{
      dispatch(showLoading());
      const response = await bookShow({show: showId, user, seats: selectedSeats, transactionId});
      if(response.success){
        message.success(response.message);
        //show all our bookings in the profile page
        navigate("/profile");
      }else{
        message.error(response.message);
      }
      dispatch(hideLoading());
    }catch(err){
      message.error(err.message);
      dispatch(hideLoading());
    }
  }

  // Function to generate seat layout dynamically
  const getSeats = () => {
    let columns = 12; // Number of columns for seating arrangement
    let totalSeats = 120; // Total number of seats
    let rows = totalSeats / columns; // Calculating number of rows

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div">
            {/* Placeholder for screen display */}
          </div>
        </div>
        <ul
          className="seat-ul justify-content-center"
          style={{ marginLeft: "25%" }}
        >
          {Array.from(Array(rows).keys()).map((row) =>
            // Mapping rows
            Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1; // Calculating seat number

              let seatClass = "seat-btn"; // Default class for seat button
              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected"; // Adding 'selected' class if seat is selected
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked"; // Adding 'booked' class if seat is already booked
              }
              if (seatNumber <= totalSeats) {
                // Rendering seat button if seat number is valid
                return (
                  <li key={seatNumber}>
                    {/* Key added for React list rendering optimization */}
                    <button
                      className={seatClass}
                      onClick={() => {
                        // Function to handle seat selection/deselection
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber,
                            ),
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
              }
            }),
          )}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.title}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {/* Rendering dynamic seat layout */}
              {getSeats()} 
              { selectedSeats.length > 0 && (
                <StripeCheckout
                token = {onToken}
                billingAddress
                amount = {selectedSeats.length * show.ticketPrice * 100}
                stripeKey = "pk_test_2VmtDx5s0gIh5ojgsvijNrLa00GNgwwfEN"
                >
                  <div className="max-width-600 mx-auto">
                  {/* when a user click pay now , stripeCheckout call the token cb function . this fn receives a token object from stripe , containig payment details , which will be then used to procees the payent on your server  */}
                    <Button type ="primary" shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default BookShow;
