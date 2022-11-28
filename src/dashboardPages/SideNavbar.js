import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/UserAuthContext";
import useCheckUserRole from "../hooks/useCheckUserRole";

const SideNavbar = () => {
  const { userInfo } = useContext(AuthContext);
  const [role] = useCheckUserRole(userInfo?.email);
  return (
    <section className="hidden lg:inline-block">
      <div className="h-screen p-3 w-48 md:w-56 border-r-2">
        <div className="space-y-3">
          <ul className="pt-2 pb-4 space-y-3">
            {role === "seller" ? (
              <>
                <LinkItem to="/dashboard/add-product">Add a products</LinkItem>
                <LinkItem to="/dashboard/products">My products</LinkItem>
                <LinkItem to="/dashboard/my-buyers">My Buyers</LinkItem>
              </>
            ) : role === "admin" ? (
              <>
                <LinkItem to="/dashboard/all-buyer">All Buyer</LinkItem>
                <LinkItem to="/dashboard/all-seller">All Seller</LinkItem>
                <LinkItem to="/dashboard/reported-item">Reported Item</LinkItem>
              </>
            ) : role === "buyer"? (
              <>
                <LinkItem to="/dashboard/my-booking">My Booking</LinkItem>
                <LinkItem to="/dashboard/my-wishlist">Wishlist</LinkItem>
              </> 
            ): <></>}
          </ul>
        </div>
      </div>
    </section>
  );
};

const LinkItem = ({ to, children }) => {
  return (
    <li className="hover:font-medium text-gray-600">
      <NavLink
        end
        className={({ isActive }) => (isActive ? "font-medium underline" : "")}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
};
export default SideNavbar;
