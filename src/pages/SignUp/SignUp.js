import React from 'react';
import { Link } from 'react-router-dom';
import SocialSignUpButton from '../Shared/SocialSignUpButton';

const SignUp = () => {
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
              Create your account
            </h2>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="focus:underline hover:underline text-sky-500">
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
                  className="px-8 py-2 font-semibold rounded-md border border-primary"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </section>
      );
};

export default SignUp;