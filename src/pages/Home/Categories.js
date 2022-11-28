import React from "react";
import { Link } from "react-router-dom";
import useLoadCategories from "../../hooks/useLoadCategories";

const Categories = () => {
  const categories = useLoadCategories();

  return (
    <section className="p-6 my-6">
      <h1 className="text-center font-bold font-serif text-2xl mb-8 text-gray-700">
        Make Your Choice
      </h1>
      <div className="container max-w-screen-lg grid gap-6 mx-auto grid-cols-2 sm:grid-cols-5 ">
        {categories?.map((item) => (
          <Link
            to={`/category/${item._id}`}
            key={item._id}
            className="text-center p-3 sm:px-4 space-x-2 rounded-lg md:space-x-2 border hover:shadow-md cursor-pointer text-gray-600 hover:text-primary duration-300 border-primary"
          >
            <div className="flex justify-center align-middle rounded-lg">
              <img src={item.image} alt="" className="h-20 w-24" />
            </div>
            <div className="flex flex-col justify-center align-middle border-t-2 mt-1">
              <p className="text-base font-semibold leading-none pt-2">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
