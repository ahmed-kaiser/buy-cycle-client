import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { useContext, useState } from "react";
import useCheckUserRole from "../../../hooks/useCheckUserRole";
import { AuthContext } from "../../../context/UserAuthContext";


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { userInfo, userSignOut } = useContext(AuthContext);
  const [role] = useCheckUserRole(userInfo?.email);
  const navigate = useNavigate();

  const menu = [
    { title: "home", to: "/", private: false },
    { title: "blog", to: "/blog", private: false },
    { title: "dashboard", to: "/dashboard", private: true },
  ];

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = () => {
    userSignOut()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <nav className="p-4 bg-gray-50 sticky top-0 z-10">
      <div className="container flex justify-between items-center h-8 md:h-14 mx-auto">
        <Link
          to="/"
          aria-label="Back to homepage"
          className="flex items-center"
        >
          <h1 className="font-serif font-bold text-2xl text-primary">
            BuyCycle
          </h1>
        </Link>
        {/* -------- Menu for large screen -------- */}
        <ul className="items-stretch hidden space-x-3 lg:flex">
          {menu.map((item, index) => (
            <li
              key={index}
              className={`px-3 hover:underline capitalize ${
                item.private && !userInfo && "hidden"
              }`}
            >
              <NavLink
                end
                className={({ isActive }) =>
                  isActive ? "font-medium underline" : ""
                }
                to={item.to}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* ---- Menu for small screen ------ */}
        <ul
          className={`absolute z-10 top-[62px] md:top-[80px] left-0  bg-gray-50 w-[200px] h-screen pl-4 lg:hidden ${
            showMenu ? "left-0" : "-left-[300px]"
          } duration-500 space-y-2`}
        >
          {menu.map((item, index) => (
            <li
              key={index}
              className={`px-3 hover:underline capitalize ${
                item.private && !userInfo && "hidden"
              }`}
            >
              <NavLink
                end
                className={({ isActive }) =>
                  isActive ? "font-medium underline" : ""
                }
                to={item.to}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
          {userInfo && (
            <>
              {role === "seller" ? (
                <>
                  <LinkItem to="/dashboard/add-product">
                    Add a products
                  </LinkItem>
                  <LinkItem to="/dashboard/products">My products</LinkItem>
                  <LinkItem to="/dashboard/my-buyers">My Buyers</LinkItem>
                </>
              ) : role === "admin" ? (
                <>
                  <LinkItem to="/dashboard/all-buyer">All Buyer</LinkItem>
                  <LinkItem to="/dashboard/all-seller">All Seller</LinkItem>
                  <LinkItem to="">Reported Item</LinkItem>
                </>
              ) : role === "buyer" ? (
                <>
                  <LinkItem to="/dashboard/my-booking">My Booking</LinkItem>
                  <LinkItem to="/dashboard/my-wishlist">Wishlist</LinkItem>
                </>
              ) : <></>}
            </>
          )}
          {!userInfo ? (
            <>
              <LinkButton to="/sign-in">Sign-In</LinkButton>
              <LinkButton to="/sign-up">Sign-Up</LinkButton>
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                className="self-center px-3 py-1 font-semibold"
              >
                Sign-Out
              </button>
            </>
          )}
        </ul>
        {/* ------- Sign-up and Sign-in large screen -------- */}
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {!userInfo ? (
            <>
              <Link to="/sign-in" className="self-center px-3 py-1.5 rounded">
                Sign-In
              </Link>
              <Link
                to="/sign-up"
                className="self-center px-3 py-1.5 font-semibold rounded border border-primary"
              >
                Sign-Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                className="self-center px-3 py-1.5 font-semibold"
              >
                Sign-Out
              </button>
            </>
          )}
        </div>
        {/* --------- Menu button ------- */}
        <button onClick={handleMenuButtonClick} className="lg:hidden">
          {showMenu ? (
            <RiCloseFill className="h-7 w-7" />
          ) : (
            <RiMenuFill className="h-7 w-7" />
          )}
        </button>
      </div>
    </nav>
  );
};

const LinkItem = ({ to, children }) => {
  return (
    <li className="px-3 hover:underline text-gray-600">
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

const LinkButton = ({ to, children }) => {
  return (
    <li>
      <Link to={to} className="self-center px-3 py-1 font-semibold">
        {children}
      </Link>
    </li>
  );
};

export default Navbar;
