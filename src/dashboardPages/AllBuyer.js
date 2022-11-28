import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../context/GlobalModalContext";
import { AuthContext } from "../context/UserAuthContext";
import Loading from "../pages/Shared/Loading";
import ButtonRed from "./Buttons/ButtonRed";

const AllBuyer = () => {
  const { userInfo } = useContext(AuthContext);
  const { handleShowModal, modalData } = useContext(ModalContext);
  const [buyers, setBuyers] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `https://buy-cycle-server.vercel.app/all-users?email=${userInfo.email}&role=buyer`,
    })
      .then((res) => {
        setBuyers(res.data);
        setDataLoading(false);
      })
      .catch((err) => toast.error(err.messages));
  }, [userInfo.email, refetch]);

  const handleDeleteBtn = (title, id) => {
    handleShowModal();
    modalData(title, id, performDelete);
  };

  const performDelete = (id) => {
    axios({
      method: "delete",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `https://buy-cycle-server.vercel.app/users/${id}?email=${userInfo.email}&role=buyer`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Buyer Account deleted successfully...");
          setRefetch(!refetch);
        }
      })
      .catch((err) => toast.error(err.messages));
  };

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        All Buyer
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
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers?.map((person, index) => (
              <tr key={person._id} className="border-b border-opacity-20">
                <td className="p-2">
                  <p>{index + 1}</p>
                </td>
                <td className="p-2">
                  <img
                    src={
                      person.photoURL ||
                      "https://i.ibb.co/8D0XDSs/default-profile.jpg"
                    }
                    alt=""
                    className="h-20 w-20"
                  />
                </td>
                <td className="p-2">
                  <p>{person.username}</p>
                </td>
                <td className="p-2">
                  <p>{person.email}</p>
                </td>
                <td className="p-2">
                  <ButtonRed
                    onClick={() => handleDeleteBtn(person.username, person._id)}
                  >
                    Delete
                  </ButtonRed>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyer;
