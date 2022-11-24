import React from "react";
import { Link } from "react-router-dom";
import SocialSignUpButton from "../Shared/SocialSignUpButton";

const SignIn = () => {
  const handleSignInForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  return (
    <section className="min-h-screen py-16 px-4">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 mx-auto border">
        <h2 className="mb-3 text-2xl font-semibold text-center">
          Sign In to your account
        </h2>
        <p className="text-sm text-center">
          Don't have account?{" "}
          <Link to="/sign-up" className="focus:underline hover:underline text-sky-500">
            Sign-up here
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
              <label className="block text-sm">Email address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm">Password</label>
                <Link to="" className="text-xs hover:underline text-sky-500">
                  Forgot password?
                </Link>
              </div>
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
              className="px-8 py-2 font-semibold rounded-md border border-primary"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
