import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
const error = useRouteError();
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-6xl">
            Oops!
          </h2>
          <p className="text-xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8">
          <i>{error.statusText || error.message}</i>
          </p>
          <Link
          to="/"
            className="px-8 py-3 font-semibold rounded text-blue-500 underline"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
