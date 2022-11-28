import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserAuthContext";
import axios from "axios";
import SocialSignUpButton from "../Shared/SocialSignUpButton";
import useScrollToTop from "../../hooks/useScrollToTop";
import Loading from "../Shared/Loading";
import useTitle from "../../hooks/useTitle";

const SignUp = () => {
  useScrollToTop();
  useTitle("Sign-Up");
  const { createUser, updateUserProfile, userSignOut } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const response = await createUser(data.email, data.password);
    const user = response.user;
    if (user) {
      const userData = {
        username: data.username,
        email: data.email,
        photoURL: "https://i.ibb.co/8D0XDSs/default-profile.jpg",
        role: data.account_type,
        wishlist: [],
      };
      axios({
        method: "POST",
        url: "https://buy-cycle-server.vercel.app/users",
        data: userData,
      })
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success("Account created successfully......");
            updateUserProfile(
              data.username,
              "https://i.ibb.co/8D0XDSs/default-profile.jpg"
            )
              .then((res) => {
                userSignOut()
                  .then(() => {
                    toast.success("Sign in now...");
                    setIsLoading(true);
                    navigate("/sign-in");
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <section className="min-h-screen py-16 px-4">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 mx-auto relative bg-slate-100">
        <h2 className="mb-3 text-2xl font-semibold text-center">
          Create your account
        </h2>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="focus:underline hover:underline text-sky-500"
          >
            Sign-in here
          </Link>
        </p>
        <SocialSignUpButton />
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:dark:text-gray-400" />
          <p className="px-3 dark:dark:text-gray-400">OR</p>
          <hr className="w-full dark:dark:text-gray-400" />
        </div>
        <form
          onSubmit={handleSignInForm}
          className="space-y-8 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <select
                name="account_type"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border focus:border-primary"
              >
                <option value="buyer">Buyer Account</option>
                <option value="seller">Seller Account</option>
              </select>
            </div>
            <div className="space-y-2">
              <input
                type="password"
                name="password"
                required
                placeholder="*********"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border focus:border-primary"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-1 font-semibold rounded-md border border-primary hover:bg-primary hover:text-white duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-40">
            <div className="flex justify-center items-center h-full">
              <Loading />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUp;
