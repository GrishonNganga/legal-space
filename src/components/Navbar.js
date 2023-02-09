import { useState, useEffect } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import white from "../assets/FINALWhite.svg";

import { userStore } from "../stores";

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [clicked, setClicked] = useState(false);
  const user = userStore((state) => state.user);

  useEffect(() => {
    localStorage.setItem("clicked", JSON.parse(clicked));
  }, [clicked]);

  return (
    <nav className="w-full sticky top-0 z-50 bg-dark h-auto">
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <img
                src={white}
                alt="white logo"
                className="text-white h-10 flex justify-center"
              />
            </a>
            <a
            href="/login"
            className="rounded-md bg-legalYellow px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-legalGreen"
          >
            Login
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
        <div className="hidden md:block">
          <a
            href="/login"
            className="rounded-md bg-legalYellow px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-legalGreen"
          >
            Login
          </a>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block bg-white h-4/5 w-screen" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 px-4">
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/">Home</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white focus:bg-legalBlue">
                <a href="/pricing">Pricing</a>
              </li>

              <li className="text-legalLightGray md:hover:text-white">
                <a href="/contact">Contact</a>
              </li>
            </ul>

            {/* <div
              className="mt-3 space-y-2 md:hidden md:inline-block w-3/5"
              aria-hidden={true}
            >
              {(user && (
                <a
                  href="/dashboard"
                  className="inline-block w-full px-4 py-2 text-center text-white bg-legalYellow ml-12"
                >
                  Visit Dashboard
                </a>
              )) || (
                <>
                  <a
                    href="/client-signup"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-legalYellow ml-12"
                  >
                    Client Signup
                  </a>
                  <a
                    href="/lawyer-signup"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-dark ml-12"
                  >
                    Lawyer Signup
                  </a>
                </>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
