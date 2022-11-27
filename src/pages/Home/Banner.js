import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section>
      <div className="p-6 py-12 bg-slate-100 text-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-2xl tracking-tighter font-bold text-gray-600">
              Discover the offers and exclusive promotion with our e-newsletter
            </h2>
            <Link
              to="/sign-up"
              className="px-5 mt-4 lg:mt-0 py-2 rounded-md border block bg-gray-100 text-gray-700 border-gray-200 font-medium"
            >
              Sign-up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
