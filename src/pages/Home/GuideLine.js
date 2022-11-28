import React, { useState } from "react";

const GuideLine = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section className="p-6">
      <div className="container mx-auto">
        <div className="flex justify-center my-4">
          <label className="inline-flex items-center space-x-4 cursor-pointer">
            <span
              className={`font-medium text-lg ${!toggle && "text-green-600"}`}
            >
              Buyer
            </span>
            <span className="relative">
              <input
                onChange={handleToggle}
                id="Toggle1"
                type="checkbox"
                className="hidden peer"
              />
              <div className="w-10 h-6 rounded-full shadow-inner border peer-checked:bg-gray-100"></div>
              <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-500"></div>
            </span>
            <span
              className={`font-medium text-lg ${toggle && "text-green-600"}`}
            >
              Seller
            </span>
          </label>
        </div>
        {!toggle ? (
          <div>
            <h2 className="text-xl font-bold text-center text-gray-700">
              Buying a bicycle on ByCycle is as easy as 1-2-3
            </h2>
            <div className="grid gap-6 my-16 lg:grid-cols-3 max-w-screen-lg mx-auto justify-items-center">
              <Card step="1" text="Find your second-hand bike" />
              <Card step="2" text="Make a booking" />
              <Card step="3" text="Pay to confirm" />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-center text-gray-700">
              Selling a bicycle on ByCycle is as easy as 1-2-3
            </h2>
            <div className="grid gap-6 my-16 lg:grid-cols-3 max-w-screen-lg mx-auto justify-items-center">
              <Card step="1" text="Create yor account as seller" />
              <Card step="2" text="Add your product with proper data" />
              <Card step="3" text="Get paid directly to you account" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Card = ({ step, text }) => {
  return (
    <div className="flex flex-col p-6 space-y-4 rounded-md text-center max-w-xs border w-96 h-56">
      <span className="text-8xl text-green-100 font-extrabold">{step}</span>
      <p className="text-xl font-semibold">{text}</p>
    </div>
  );
};

export default GuideLine;
