import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { RiHeartAddLine, RiCheckboxCircleFill } from "react-icons/ri";

const ProductDetailsCard = ({ data, setRegisterData, handleClick, email, setOperationType }) => {
  const handleButtonClick = (operationType) => {
    handleClick();
    setRegisterData(data);
    setOperationType(operationType);
  };

  const handleAddToWishlist = (id) => {
    axios({
      method: "patch",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/wishlist/${id}?email=${email}`,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Added to wishlist...");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border rounded-md shadow-md max-w-sm">
      <div className="flex justify-center w-full h-52">
        <img alt="" className="w-full h-full" src={data.image} />
      </div>
      <div className="flex flex-col flex-1 p-3 px-6">
        <div className="flex items-center">
          <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
            {data.title}
          </h3>
          {data.available && (
            <button onClick={() => handleAddToWishlist(data._id)}>
              <RiHeartAddLine className="h-5 w-5 hover:text-yellow-400" />
            </button>
          )}
        </div>
        <div className="pt-3 text-sm space-y-1">
          <p className="capitalize">
            <span className="font-medium mr-1">Selling Price:</span> $
            {data.selling_price}
          </p>
          <p className="capitalize">
            <span className="font-medium mr-1">Purchase Price:</span> $
            {data.purchase_price}
          </p>
          <p className="capitalize">
            <span className="font-medium mr-1">Condition:</span>
            {data.condition}
          </p>
          <p className="capitalize">
            <span className="font-medium mr-1">Purchase Date:</span>{" "}
            {data.purchase_date}
          </p>
          <p className="capitalize">
            <span className="font-medium mr-1">Post Date:</span>{" "}
            {data.postedAt.slice(0, 10)}
          </p>
          <p className="capitalize">
            <span className="font-medium mr-1">Location:</span> {data.area},{" "}
            {data.city}
          </p>
          <p className="capitalize flex items-center gap-1">
            <span className="font-medium mr-1">Seller Name:</span>{" "}
            {data.sellerDetails[0].username}
            {
              data.sellerDetails[0].verified && <RiCheckboxCircleFill className="text-green-500" />
            }
          </p>
        </div>
        <div className="mt-6 text-center space-x-2">
          {data.available ? (
            <>
              <button
                onClick={() => handleButtonClick("booking")}
                className="bg-sky-400 py-1 px-3 text-gray-200 font-medium rounded-md hover:bg-sky-500 hover:text-gray-50 duration-300"
              >
                Book Now
              </button>
              <button onClick={() => handleButtonClick("report")} className="bg-yellow-600 py-1 px-3 text-gray-200 font-medium rounded-md hover:bg-yellow-500 hover:text-gray-50 duration-300">
                Report
              </button>
            </>
          ) : (
            <button
              disabled
              className="bg-gray-700 py-1 px-6 text-gray-200 font-medium rounded-md"
            >
              Booked
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
