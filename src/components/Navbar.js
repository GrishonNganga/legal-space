import { useState, useEffect } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

import { userStore } from "../stores";

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [clicked, setClicked] = useState(false);
  const user = userStore(state => state.user)

  useEffect(() => {
    localStorage.setItem("clicked", JSON.parse(clicked));
  }, [clicked]);

  return (
    <nav className="w-full fixed top-0 z-50 bg-dark h-auto">
      <div
        className={`h-14 ${clicked ? "hidden" : "flex"
          } items-center flex-row justify-center bg-black top-0`}
      >
        <div className="flex flex-row items-center">
          <p className="text-sm text-white px-10">
            Ready to take your firm to the next level? Join over 200+ Legal
            space clients
          </p>
          <button
            className="hidden sm:flex flex-row items-center py-3 outline-white border cursor-pointer text-white px-8 space-x-2"
            type="button"
            onClick={() => setClicked(true)}
          >
            <PlayIcon height={20} width={20} />
            <p className="text-xs">See Video</p>
          </button>
        </div>
      </div>
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                legalSPACE
              </h2>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block bg-white h-4/5 w-screen" : "hidden"
              }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 px-4">
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/">Home</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white focus:bg-legalBlue">
                <a href="/">About Us</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/">Services</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/">Testimonials</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/">Contact</a>
              </li>

            </ul>

            <div
              className="mt-3 space-y-2 lg:hidden md:inline-block w-3/5"
              aria-hidden={true}
            >
              {
                user &&
                <a
                  href="/dashboard"
                  className="inline-block w-full px-4 py-2 text-center text-white bg-legalYellow ml-12"
                >
                  Visit Dashboard
                </a> 
                ||
                <a
                  href="/client-signup"
                  className="inline-block w-full px-4 py-2 text-center text-white bg-legalYellow ml-12"
                >
                  Free Consultation
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
