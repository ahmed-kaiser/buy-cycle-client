import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../context/GlobalModalContext";
import { AuthContext } from "../context/UserAuthContext";
import useScrollToTop from "../hooks/useScrollToTop";
import Loading from "../pages/Shared/Loading";
import ButtonGray from "./Buttons/ButtonGray";
import ButtonGreen from "./Buttons/ButtonGreen";
import ButtonRed from "./Buttons/ButtonRed";

const MyProducts = () => {
  useScrollToTop();
  const { userInfo } = useContext(AuthContext);
  const { handleShowModal, modalData } = useContext(ModalContext);

  const { data: products, refetch, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        `https://buy-cycle-server.vercel.app/products?email=${userInfo?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      return data;
    },
  });

  const handleDeleteBtn = (title, id) => {
    handleShowModal();
    modalData(title, id, performDelete);
  };

  const performDelete = async (id) => {
    axios({
      method: "delete",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `https://buy-cycle-server.vercel.app/products?email=${userInfo.email}&id=${id}`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Product successfully deleted");
          refetch();
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const addToAdvertiseList = (id) => {
    const data = {
      productId: id,
      sellerEmail: userInfo.email,
    };

    axios({
      url: `https://buy-cycle-server.vercel.app/advertise?email=${userInfo.email}`,
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Enabled advertise....");
          refetch();
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const removeFromAdvertiseList = (id) => {
    axios({
      url: `https://buy-cycle-server.vercel.app/advertise/${id}?email=${userInfo.email}`,
      method: "delete",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Disabled advertise....");
          refetch();
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        All Products
      </h1>
      {products?.length > 0 ? (
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
                <th className="p-2">Selling Price</th>
                <th className="p-2">Available</th>
                <th className="p-2">Advertise</th>
                <th className="p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr key={product._id} className="border-b border-opacity-20">
                  <td className="p-2">
                    <p>{index + 1}</p>
                  </td>
                  <td className="p-2">
                    <img
                      src={product.image}
                      alt=""
                      className="object-fill max-h-[100px] w-28"
                    />
                  </td>
                  <td className="p-2">
                    <p>{product.title}</p>
                  </td>
                  <td className="p-2">
                    <p>${product.selling_price}</p>
                  </td>
                  <td className="p-2">
                    {product.available ? <p>Yes</p> : <p>Sold Out</p>}
                  </td>
                  <td className="p-2">
                    {product.available && (
                      <>
                        {product.advertise?._id ? (
                          <ButtonGreen
                            onClick={() => removeFromAdvertiseList(product._id)}
                          >
                            Enabled
                          </ButtonGreen>
                        ) : (
                          <ButtonGray
                            onClick={() => addToAdvertiseList(product._id)}
                          >
                            Disabled
                          </ButtonGray>
                        )}
                      </>
                    )}
                  </td>
                  <td className="p-2">
                    <ButtonRed
                      onClick={() =>
                        handleDeleteBtn(product.title, product._id)
                      }
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
          No product added
        </p>
      )}
    </div>
  );
};

export default MyProducts;
