import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/UserAuthContext";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const { userInfo } = useContext(AuthContext);
  const [booking, setBooking] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState({});
  const id = useParams();
  useEffect(() => {
    axios({
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/bookings/${id.id}?email=${userInfo.email}`,
    })
      .then((res) => setBooking(res.data))
      .catch((err) => console.log(err));
  }, [userInfo.email, id]);

  return (
    <section>
      {
        booking && 
        <div className="flex flex-col max-w-md p-2 space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 mx-auto">
        <h2 className="text-2xl font-semibold">Order items</h2>
        <ul className="flex flex-col pt-4 space-y-2">
          <li className="flex items-start justify-between">
            <h3 className="font-medium">{booking?.productTitle}</h3>
            <div className="text-right">
              <span className="block">${booking?.price}</span>
            </div>
          </li>
        </ul>
        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>$0.00</span>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">${booking.price}</span>
            </div>
          </div>
        </div>
        <div className="pt-10">
            <Elements stripe={stripePromise}>
            <CheckOutForm bookingInfo={booking} setPaymentSuccess={setPaymentSuccess} />
          </Elements>
        </div>
        {
            paymentSuccess?.status && 
            <p><span className="font-medium">Your TransactionId:</span><br/>{paymentSuccess?.transactionId}</p>
        }
      </div>
      }
    </section>
  );
};

export default Payment;
