import React from "react";
import { Link } from "react-router-dom";

const SideNavbar = () => {
  return (
    <section className="hidden lg:inline-block">
      <div className="h-screen p-3 w-48 md:w-56 border-r-2">
        <div className="space-y-3">
          <ul className="pt-2 pb-4 space-y-3">
            <li className="hover:font-medium">
              <Link to="/dashboard/products">My products</Link>
            </li>
            <li>
              <Link to="/dashboard/add-product">Add a products</Link>
            </li>
            <li>
              <Link>My Buyers</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SideNavbar;
