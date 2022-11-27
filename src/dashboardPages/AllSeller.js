import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../context/GlobalModalContext";
import { AuthContext } from "../context/UserAuthContext";

const AllSeller = () => {
  const { userInfo } = useContext(AuthContext);
  const [sellers, setSellers] = useState([]);
  const { handleShowModal, modalData } = useContext(ModalContext);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/all-users?email=${userInfo.email}&role=seller`,
    })
      .then((res) => setSellers(res.data))
      .catch((err) => console.log(err));
  }, [userInfo.email, refetch]);

  const performDelete = (id) => {
    axios({
      method: "delete",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/users/${id}?email=${userInfo.email}&role=buyer`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Seller Account deleted successfully...");
          setRefetch(!refetch);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteBtn = (title, id) => {
    handleShowModal();
    modalData(title, id, performDelete);
  };

  const handleVerification = (id) => {
    axios({
      method: "patch",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/users/${id}?email=${userInfo.email}&role=buyer`,
    })
      .then((res) => {
          toast.success("User verification done....");
          setRefetch(!refetch);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        All Seller
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
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Verified</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((item, index) => (
              <tr key={item._id} className="border-b border-opacity-20">
                <td className="p-2">
                  <p>{index + 1}</p>
                </td>
                <td className="p-2">
                  <img src={item.photoURL} alt="" className="h-20 w-20" />
                </td>
                <td className="p-2">
                  <p>{item.username}</p>
                </td>
                <td className="p-2">
                  <p>{item.email}</p>
                </td>
                <td className="p-2">
                  {item.verified ? (
                    <button
                      onClick={() => handleVerification(item._id)}
                      className="bg-green-400 hover:bg-green-500 p-1 rounded-md text-gray-50 font-medium"
                    >
                      Verified
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerification(item._id)}
                      className="bg-gray-400 hover:bg-gray-500 p-1 rounded-md text-gray-50 font-medium"
                    >
                      Verify
                    </button>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteBtn(item.username, item._id)}
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
    </div>
  );
};

export default AllSeller;