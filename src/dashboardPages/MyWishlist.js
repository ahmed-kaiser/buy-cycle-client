import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../context/GlobalModalContext";
import { AuthContext } from "../context/UserAuthContext";

const MyWishlist = () => {
  const { userInfo } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const { handleShowModal, modalData } = useContext(ModalContext);
  const [refetch, setRefetch] = useState(false);

  const handleDeleteBtn = (title, id) => {
    handleShowModal();
    modalData(title, id, performDelete);
  };

  const performDelete = async (id) => {
    axios({
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/wishlist/${id}?email=${userInfo.email}`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Product successfully deleted");
          setRefetch(!refetch);
        }
      })
      .catch((err) => console.log(err));
  };

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
  }, [userInfo.email, refetch]);

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        My Wishlist
      </h1>
      {products.length > 0 ? (
        <div className="overflow-x-auto max-w-5xl mx-auto mt-6">
          <table className="min-w-full text-xs md:text-sm">
            <colgroup>
              <col />
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
                <th className="p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={index} className="border-b border-opacity-20">
                  <td className="p-2">
                    <p>{index + 1}</p>
                  </td>
                  <td className="p-2 pr-2">
                    <img
                      src={item.details?.image}
                      alt=""
                      className="object-fill h-20 w-20"
                    />
                  </td>
                  <td className="p-2">
                    <p>{item.details?.title}</p>
                  </td>
                  <td className="p-2">
                    <p>${item.details?.selling_price}</p>
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
                  <td className="p-2">
                    <button
                      onClick={() =>
                        handleDeleteBtn(item.details?.title, item.details?._id)
                      }
                      className="bg-red-400 hover:bg-red-500 p-1 rounded-md text-gray-50 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4 font-medium text-gray-500">
          No product added
        </p>
      )}
    </div>
  );
};

export default MyWishlist;
