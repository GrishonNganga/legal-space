import { useState } from "react";

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full fixed bg-dark h-24 pt-4">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
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
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block bg-white h-4/5 w-screen" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 px-4 pt-8">
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/">Home</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white focus:bg-legalBlue">
                <a href="/about">About Us</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/services">Services</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/testimonials">Testimonials</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/contact">Contact</a>
              </li>
              <li className="text-legalLightGray md:hover:text-white">
                <a href="/client-landing">Signup</a>
              </li>
            </ul>

            <div
              className="mt-3 space-y-2 lg:hidden md:inline-block w-3/5"
              aria-hidden={true}
            >
              <a
                href="/"
                className="inline-block w-full px-4 py-2 text-center text-white bg-legalYellow"
              >
                Free Consultation
              </a>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 lg:inline-block h-11 pt-3">
          <a href="/" className="px-4 py-3 text-white bg-legalYellow">
            Free Consultation
          </a>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;