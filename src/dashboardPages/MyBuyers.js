import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../context/UserAuthContext";
import useScrollToTop from "../hooks/useScrollToTop";
import Loading from "../pages/Shared/Loading";

const MyBuyers = () => {
  useScrollToTop();
  const { userInfo } = useContext(AuthContext);
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const res = await fetch(
        `https://buy-cycle-server.vercel.app/bookings/seller?email=${userInfo.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        My Buyers
      </h1>
      {bookings?.length > 0 ? (
        <div className="overflow-x-auto max-w-5xl mx-auto mt-6">
          <table className="min-w-full text-xs md:text-sm">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="text-left">
                <th className="p-2">#</th>
                <th className="p-2">Product Title</th>
                <th className="p-2">Buyer Info</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Booking</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((item, index) => (
                <tr key={item._id} className="border-b border-opacity-20">
                  <td className="p-2">
                    <p>{index + 1}</p>
                  </td>
                  <td className="p-2">
                    <p>{item.productTitle}</p>
                  </td>
                  <td className="p-2">
                    <p>{item.buyerEmail}</p>
                    <p>{item.buyerPhone}</p>
                    <p>{item.buyerLocation}</p>
                  </td>
                  <td className="p-2">
                    {item.paid ? (
                      <p className="text-green-500">Paid</p>
                    ) : (
                      <p>Not Paid</p>
                    )}
                  </td>
                  <td className="p-2">
                    {!item.paid ? (
                      <button className="bg-red-400 hover:bg-red-500 px-2 py-1 rounded-md text-gray-50 font-medium">
                        Cancel
                      </button>
                    ) : (
                      <button className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded-md text-gray-50 font-medium">
                        Shipped
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4 font-medium text-gray-500">
          No buyer booking info available
        </p>
      )}
    </div>
  );
};

export default MyBuyers;
