import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/UserAuthContext";

const MyProducts = () => {
  const { userInfo } = useContext(AuthContext);

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

  const handleDelete = async (id) => {
    axios({
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/products?email=${userInfo.email}&id=${id}`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
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
                      <p>Yes</p> : <p>Booked</p>
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
                      onClick={() => handleDelete(product._id)}
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

export default MyProducts;
