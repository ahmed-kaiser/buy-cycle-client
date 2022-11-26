import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/UserAuthContext";

const MyProducts = () => {
  const { userInfo } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null)

  const handleModal = () => {
    setShowModal(!showModal);
  }

  const handleDeleteBtn = (product) => {
    setDeleteItem(product);
    handleModal();
  }

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/products?email=${userInfo.email}`,
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

  const performDelete = async () => {
    axios({
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/products?email=${userInfo.email}&id=${deleteItem._id}`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          handleModal();
          toast.success("Product successfully deleted");
          refetch();
        }
      })
      .catch((err) => toast.error(err));
  };

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
                    <img src={product.image} alt="" className="h-28 w-28" />
                  </td>
                  <td className="p-2">
                    <p>{product.title}</p>
                  </td>
                  <td className="p-2">
                    <p>${product.selling_price}</p>
                  </td>
                  <td className="p-2">
                    {
                      product.available? 
                      <p>Yes</p> : <p>Sold Out</p>
                    }
                  </td>
                  <td className="p-2">
                    {product.available && (
                      <button className="bg-gray-400 hover:bg-gray-500 p-1 rounded-md text-gray-50 font-medium">
                        Disabled
                      </button>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteBtn(product)}
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
      <DeleteConfirmModal
        itemTitle={deleteItem?.title} 
        showModal={showModal} 
        handleModal={handleModal}
        handleConfirm={performDelete}
      />
    </div>
  );
};

const DeleteConfirmModal = ({ showModal, handleModal, itemTitle, handleConfirm }) => {
  return(
    <section className={`absolute w-full h-full ${!showModal && 'hidden'}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xs p-4 bg-gray-200 rounded-md shadow-md text-center">
          <p>Are you sure you want to delete "<span className="font-medium">{itemTitle}</span>"</p>
          <div className="space-x-2 mt-3">
            <button onClick={handleConfirm} className="py-1 px-2 text-white font-medium bg-red-400 hover:bg-red-500 rounded-md">Confirm</button>
            <button onClick={handleModal} className="py-1 px-2 bg-green-500 hover:bg-green-600 rounded-md text-white font-medium">Cancel</button>
          </div>
      </div>
    </section>
  )
}

export default MyProducts;
