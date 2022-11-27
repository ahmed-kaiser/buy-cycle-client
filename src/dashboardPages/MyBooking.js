import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserAuthContext";

const MyBooking = () => {
  const { userInfo } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/bookings?email=${userInfo.email}`,
    })
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, [userInfo.email]);

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        My Bookings
      </h1>
      {
        bookings.length > 0? 
        <div className="overflow-x-auto max-w-5xl mx-auto mt-6">
        <table className="min-w-full text-xs md:text-sm">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="text-left">
              <th className="p-2">#</th>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((item, index) => (
              <tr key={item._id} className="border-b border-opacity-20">
                <td className="p-2">
                  <p>{index + 1}</p>
                </td>
                <td className="p-2">
                  <img
                    src={item.productDetails[0].image}
                    alt=""
                    className="h-20 w-20"
                  />
                </td>
                <td className="p-2">
                  <p>{item.productTitle}</p>
                </td>
                <td className="p-2">
                  <p>${item.productDetails[0].selling_price}</p>
                </td>
                <td className="p-2">
                  {item.paid ? (
                    <span className="bg-green-500 py-1 px-2 rounded-md text-gray-50 font-medium">
                      Paid
                    </span>
                  ) : (
                    <Link to={`/dashboard/payment/${item._id}`} className="bg-gray-500 hover:bg-gray-600 py-1 px-2 rounded-md text-gray-50 font-medium">
                       Pay
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      :
      <p className="text-center mt-4 font-medium text-gray-500">
      No booking done yet
    </p>
      }
    </div>
  );
};

export default MyBooking;
