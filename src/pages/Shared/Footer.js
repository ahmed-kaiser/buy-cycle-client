import React from "react";
import { Link } from "react-router-dom";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiYoutubeFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="px-4 divide-y bg-gray-50">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link className="flex justify-center space-x-3 lg:justify-start">
            <span className="font-serif font-bold text-2xl text-primary">
              BuyCycle
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:dark:text-gray-50">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="">Features</Link>
              </li>
              <li>
                <Link to="">Integrations</Link>
              </li>
              <li>
                <Link to="">Pricing</Link>
              </li>
              <li>
                <Link to="">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:dark:text-gray-50">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="">Privacy</Link>
              </li>
              <li>
                <Link to="">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:dark:text-gray-50">Support</h3>
            <ul className="space-y-1">
              <li>
                <Link to="">Public Query</Link>
              </li>
              <li>
                <Link to="">Documentation</Link>
              </li>
              <li>
                <Link to="">Guides</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:dark:text-gray-50">Social media</div>
            <div className="flex justify-start space-x-3">
              <Link to="" title="Facebook" className="flex items-center p-1">
                <RiFacebookCircleFill className="h-6 w-6" />
              </Link>
              <Link to="" title="Instagram" className="flex items-center p-1">
                <RiInstagramFill className="h-6 w-6" />
              </Link>
              <Link to="" title="Youtube" className="flex items-center p-1">
                <RiYoutubeFill className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:dark:text-gray-400">
        © 2022 BuyCycle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
