import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/UserAuthContext';

const MyWishlist = () => {
  const { userInfo } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/wishlist?email=${userInfo.email}`,
    })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [userInfo.email]);

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        My Wishlist
      </h1>
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
            {products?.map((item, index) => (
              <tr key={item.details._id} className="border-b border-opacity-20">
                <td className="p-2">
                  <p>{index + 1}</p>
                </td>
                <td className="p-2">
                  <img
                    src={item.details.image}
                    alt=""
                    className="object-fill h-20 w-20"
                  />
                </td>
                <td className="p-2">
                  <p>{item.details.title}</p>
                </td>
                <td className="p-2">
                  <p>${item.details.selling_price}</p>
                </td>
                <td className="p-2">
                  {item.paid ? (
                    <span className="bg-green-500 py-1 px-2 rounded-md text-gray-50 font-medium">
                      Paid
                    </span>
                  ) : (
                    <button className="bg-gray-500 hover:bg-gray-600 py-1 px-2 rounded-md text-gray-50 font-medium">
                      Not Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;