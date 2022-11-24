import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      return data;
    },
  });

  return (
    <section>
      <section className="p-6 my-6">
        <div className="container max-w-screen-lg grid gap-6 mx-auto grid-cols-2 sm:grid-cols-5 justify-items-center">
          {categories?.map((item) => (
            <Link
              to={`/category/${item._id}`}
              key={item._id}
              className="text-center p-4 space-x-2 rounded-lg md:space-x-2 border max-w-xs hover:shadow-md cursor-pointer text-gray-600 hover:text-primary duration-300"
            >
              <div className="flex justify-center align-middle rounded-lg">
                <img src={item.image} alt="" className="h-20 w-24" />
              </div>
              <div className="flex flex-col justify-center align-middle border-t-2 mt-1">
                <p className="text-xl font-semibold leading-none pt-2">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Categories;
