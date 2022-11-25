import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserAuthContext";

const AddProduct = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    setBtnState(true);
    try {
      // upload the image in image server
      const imageData = new FormData();
      imageData.append("image", data.image);

      const imageServerResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMABB_API_KEY}`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const imageURL = await imageServerResponse.json();

      // send data to database
      const productData = {
        ...data,
        image: imageURL.data.url,
        postedAt: new Date(),
        available: true,
        ownerEmail: userInfo.email
      };
      const dbResponse = await fetch(`http://localhost:5000/products?email=${userInfo.email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData),
      });
      const dbData = await dbResponse.json();
      if (dbData.acknowledged) {
        e.target.reset();
        setBtnState(false);
        toast.success("Product added successfully....");
        navigate("/dashboard/products");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
      <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
        Add a product
      </h1>
      <form onSubmit={handleFormSubmit} className="py-6">
        <div className="grid grid-cols-4 gap-2 max-w-md sm:max-w-xl lg:max-w-3xl mx-auto px-2">
          <div className="col-span-full">
            <label htmlFor="title" className="text-sm pl-1 text-gray-600">
              Title*
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title of the product"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label
              htmlFor="selling_price"
              className="text-sm pl-1 text-gray-600"
            >
              Selling Price*
            </label>
            <input
              type="number"
              name="selling_price"
              placeholder="Selling Price"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label
              htmlFor="Purchase_price"
              className="text-sm pl-1 text-gray-600"
            >
              Purchase Price*
            </label>
            <input
              type="number"
              name="purchase_price"
              placeholder="Purchase Price"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="phone" className="text-sm pl-1 text-gray-600">
              Phone*
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label
              htmlFor="purchase_date"
              className="text-sm pl-1 text-gray-600"
            >
              Purchase Date*
            </label>
            <input
              type="date"
              name="purchase_date"
              placeholder="Purchase Date"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="image" className="text-sm pl-1 text-gray-600">
              Image*
            </label>
            <input
              type="file"
              name="image"
              placeholder="Product Image"
              required
              className="w-full border px-2 py-1 bg-gray-50 border-gray-200 rounded-md focus:border-primary"
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="condition" className="text-sm pl-1 text-gray-600">
              Condition*
            </label>
            <select
              name="condition"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            >
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="city" className="text-sm pl-1 text-gray-600">
              City Name*
            </label>
            <input
              type="text"
              name="city"
              placeholder="Your City Name"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="area" className="text-sm pl-1 text-gray-600">
              Area Name*
            </label>
            <input
              type="text"
              name="area"
              placeholder="Your Area Name"
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="description" className="text-sm pl-1 text-gray-600">
              Description*
            </label>
            <textarea
              name="description"
              placeholder="Product description....."
              required
              className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
            />
          </div>
          <div className="col-span-full text-center">
            <button
              type="submit"
              disabled={btnState}
              className="bg-sky-400 px-8 py-1.5 rounded-md font-medium text-white"
            >
              {
                btnState? 
                <span className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-white block"></span>
                : <span>Add</span>
              }
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
