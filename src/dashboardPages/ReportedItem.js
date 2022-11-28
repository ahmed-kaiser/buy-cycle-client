import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../context/GlobalModalContext";
import { AuthContext } from "../context/UserAuthContext";
import Loading from "../pages/Shared/Loading";
import ButtonRed from "./Buttons/ButtonRed";

const ReportedItem = () => {
  const { userInfo } = useContext(AuthContext);
  const { handleShowModal, modalData } = useContext(ModalContext);

  const {
    data: report,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/report?email=${userInfo.email}`,
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

  const handleDeleteBtn = (title, id) => {
    handleShowModal();
    modalData(title, id, performDelete);
  };

  const performDelete = (id) => {
    axios({
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/report/${id}?email=${userInfo.email}`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Report deleted...");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        Reported Item
      </h1>
      {report.length > 0 ? (
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
                <th className="p-2">Date</th>
                <th className="p-2">Product Title</th>
                <th className="p-2">Seller Email</th>
                <th className="p-2">Buyer Email</th>
                <th className="p-2">Message</th>
                <th className="p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {report?.map((data, index) => (
                <tr key={data._id} className="border-b border-opacity-20">
                  <td className="p-2">
                    <p>{index + 1}</p>
                  </td>
                  <td className="p-2">
                    <p>{data.date.slice(0, 10)}</p>
                  </td>
                  <td className="p-2">
                    <p>{data.productTitle}</p>
                  </td>
                  <td className="p-2">
                    <p>{data.sellerEmail}</p>
                  </td>
                  <td className="p-2">
                    <p>{data.buyerEmail}</p>
                  </td>
                  <td className="p-2">
                    <p>{data.message}</p>
                  </td>
                  <td className="p-2">
                    <ButtonRed
                      onClick={() => handleDeleteBtn("Report", data._id)}
                    >
                      Delete
                    </ButtonRed>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-4 font-medium text-gray-500">
          No report posted
        </p>
      )}
    </div>
  );
};

export default ReportedItem;
