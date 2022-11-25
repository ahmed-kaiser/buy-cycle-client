import React from "react";

const ProductDetailsCard = ({ data, setBookingData, handleClick }) => {
  const handleBookingClick = () => {
    handleClick();
    setBookingData(data);
  };

  return (
    <div className="border rounded-md shadow-md p-2 max-w-sm">
      <div className="flex justify-center px-6">
        <img alt="" className="object-fill w-full h-52" src={data.image} />
      </div>
      <div className="flex flex-col flex-1 p-3 px-6">
        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
          {data.title}
        </h3>
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
          <p className="capitalize">
            <span className="font-medium mr-1">Seller Name:</span>{" "}
            {data.sellerDetails[0].username}
          </p>
        </div>
        <div className="mt-6 text-center">
          {
            data.available? <button
            onClick={handleBookingClick}
            className="bg-sky-400 py-1 px-6 text-gray-200 font-medium rounded-md hover:bg-sky-500 hover:text-gray-50 duration-300"
          >
            Book Now
          </button> :
          <button
          disabled
          className="bg-gray-700 py-1 px-6 text-gray-200 font-medium rounded-md"
        >
          Booked
        </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
