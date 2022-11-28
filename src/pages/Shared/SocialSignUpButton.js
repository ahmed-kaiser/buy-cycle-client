import { useContext, useState } from "react";
import { RiGoogleFill } from "react-icons/ri";
import { AuthContext } from "../../context/UserAuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const SocialSignUpButton = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleSignIn();
      const user = response.user;
      if (user) {
        const userData = {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "buyer",
          wishlist: []
        };
        axios({
          method: "post",
          url: "https://buy-cycle-server.vercel.app/users",
          data: userData,
        })
          .then((res) => {
            if (res.data.acknowledged) {
              toast.success("Account created successfully......");
              navigate(from, { replace: true });
            }
          })
          .catch((err) => toast.error(err.message));
      }
      const getToken = await fetch(
        `https://buy-cycle-server.vercel.app/jwt-token?email=${response.user.email}`
      );
      const token = await getToken.json();
      if (token) {
        localStorage.setItem("token", token.token);
        navigate(from, { replace:true })
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-4 space-y-4">
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="flex items-center justify-center w-full p-2.5 space-x-2 border rounded-md focus:ring-2 focus:ring-offset-1 hover:border-primary duration-500"
      >
        <RiGoogleFill className="h-6 w-6 text-red-500" />
        <p>Sign-in with Google</p>
      </button>
    </div>
  );
};

export default SocialSignUpButton;
