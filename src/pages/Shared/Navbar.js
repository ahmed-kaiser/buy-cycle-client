import { Link, useNavigate } from "react-router-dom";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/UserAuthContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { userInfo, userSignOut } = useContext(AuthContext);
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
    .then(() => navigate('/'))
    .catch(err => console.log(err))
  };

  return (
    <nav className="p-4 bg-gray-50">
      <div className="container flex justify-between items-center h-16 mx-auto">
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
            <li key={index} className="px-3 hover:underline capitalize">
              <Link to={item.to}>{item.title}</Link>
            </li> 
          ))}
        </ul>
        {/* ---- Menu for small screen ------ */}
        <ul
          className={`absolute z-10 top-[80px] left-0 h-screen bg-gray-50 w-[200px] pl-4 items-stretch lg:hidden ${
            showMenu ? "left-0" : "-left-[300px]"
          } duration-500 space-y-2`}
        >
          {menu.map((item, index) => (
            <li key={index} className="px-3 hover:underline capitalize">
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
          {
            !userInfo? 
            <>
            <li className="pt-6">
            <Link to="/sign-in" className="self-center px-3 py-1 font-semibold">
              Sign-In
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className="self-center px-3 py-1 font-semibold">
              Sign-Up
            </Link>
          </li>
            </> : 
            <>
            <button onClick={handleSignOut} className="self-center px-3 py-1 font-semibold">
              Sign-Out
            </button>
            </>
          }
        </ul>
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
              <button onClick={handleSignOut} className="self-center px-3 py-1.5 font-semibold">
                Sign-Out
              </button>
            </>
          )}
        </div>
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

export default Navbar;
