import { Link } from "react-router-dom";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menu = [
    { title: "home", to: "/", private: false },
    { title: "blog", to: "/blog", private: false },
    { title: "dashboard", to: "/dashboard", private: true },
  ];

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="p-4 bg-gray-50">
      <div className="container flex justify-between items-center h-16 mx-auto">
        <Link
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <h1 className="font-serif font-bold text-2xl text-primary">
            BuyCycle
          </h1>
        </Link>
        {/* -------- Menu for large screen -------- */}
        <ul className="items-stretch hidden space-x-3 lg:flex">
          {menu.map((item, index) => (
            <li key={index} className="px-3 hover:underline capitalize">
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
        </ul>
        {/* ---- Menu for small screen ------ */}
        <ul
          className={`absolute top-[80px] left-0 h-full bg-gray-50 w-[200px] pl-4 items-stretch lg:hidden ${
            showMenu ? "left-0" : "-left-[300px]"
          } duration-500 space-y-2`}
        >
          {menu.map((item, index) => (
            <li key={index} className="px-3 hover:underline capitalize">
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
          <li className="pt-6">
            <Link className="self-center px-3 py-1 font-semibold">Sign in</Link>
          </li>
          <li>
            <Link className="self-center px-3 py-1 font-semibold">Sign up</Link>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Link className="self-center px-3 py-1.5 rounded">Sign in</Link>
          <Link className="self-center px-3 py-1.5 font-semibold rounded border border-primary">
            Sign up
          </Link>
        </div>
        <button onClick={handleMenuButtonClick} className="lg:hidden">
          {showMenu ? (
            <RiCloseFill className="h-7 w-7" />
          ) : (
            <RiMenuFill className="h-7 w-7" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
