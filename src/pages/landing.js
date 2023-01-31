import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import woman from "../assets/images/woman.svg";
import gavel from "../assets/images/gavel.svg";
import stairs from "../assets/images/stairs.svg";
import Footer from "../components/Footer";
import Team from "../components/landing/Team";
import squigly from "../assets/images/squigly.png";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-euclid">
      <div className="bg-dark w-full h-screen flex justify-center">
        <div className="relative w-full md:w-10/12 lg:w-3/4 h-full">
          <NavBar />
          <div className="absolute top-0 w-full h-full hidden md:flex flex-col justify-center md:justify-end">
            <div className="text-lg font-normal text-legalLightGray tracking-wider mb-2">
              EXPERIENCE COMFORT
            </div>
            <div className="md:text-6xl text-4xl text-white">
              Advocating for <span className="text-legalYellow">YOU</span>,
            </div>
            <div className="md:text-7xl text-4xl text-white">
              we are for the{" "}
              <span className="text-legalYellow">
                <br />
                PEOPLE
              </span>
            </div>
            <div className="-mt-2">
              <img
                src={squigly}
                alt="squigly thing"
                className="hidden md:block"
              />
            </div>
            <div className="w-full md:w-1/2 md:text-lg text-[10px] text-legalLightGray my-5">
              We are ready to help whatever legal problem you are experiencing.
              We will help with our best lawyers. Hesitant? You can consult for
              free!
            </div>
            <div className="w-full h-1/2 md:h-1/3 flex flex-col justify-end">
              <div className=" hidden md:grid w-1/2 bg-[#FFFFFF1A] h-44 py-8 px-6 bg-accent-3-dark grid-flow-row grid-cols-3 items-center justify-center md:mt-36">
                <div className="">
                  <p className="dark:text-white text-dark font-semibold text-4xl">
                    100+
                  </p>
                  <p className="dark:text-legalLightGray text-primary text-base font-normal">
                    Qualified Lawyers
                  </p>
                </div>
                <div>
                  <p className="dark:text-white text-dark font-semibold text-4xl">
                    350+
                  </p>
                  <p className="dark:text-legalLightGray text-primary text-base font-normal">
                    Successfull Cases
                  </p>
                </div>
                <div>
                  <p className="dark:text-white text-dark font-semibold text-4xl">
                    200+
                  </p>
                  <p className="dark:text-legalLightGray text-primary text-base font-normal">
                    Trusted Clients
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" max-w-2xl h-full flex flext-col items-center justify-center md:hidden bg-landing-mobile bg-cover">
            <div className="flex sm:justify-center"></div>
            <div className="text-center flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Advocating for <span className="text-legalYellow">YOU,</span>
                <br />
                We are for the <br />
                <span className="text-legalYellow">PEOPLE</span>
              </h1>
              <p className="mt-6 md:text-lg text-[12px] leading-8 text-gray-300 px-8">
                We are ready to help whatever legal problem you are
                experiencing. We will help with our best lawyers. Hesitant? You
                can consult for free!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/lawyer-signup"
                  className="rounded-md bg-legalYellow px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-legalGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-legalGreen"
                >
                  Lawyer Signup
                </a>
                <a
                  href="/client-signup"
                  className="text-base font-semibold leading-7 text-white border rounded-md border-legalYellow px-3.5 py-1.5"
                >
                  Client Signup
                </a>
              </div>
            </div>
          </div>
          <div className="absolute right-0 w-3/4 md:w-1/2 h-full hidden md:flex justify-center items-center">
            <div className="w-full md:h-3/5">
              <img src={woman} className="w-full h-full" alt="gavel" />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-1/3 hidden md:flex items-end">
            <div className="w-1/2 h-full md:pl-8">
              <img src={gavel} className="w-full h-full" alt="gavel" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#C5CAC9] mt-12">
        <div className="flex justify-between md:hidden w-full bg-[#FFFFFF1A] py-8 px-6 bg-accent-3-dark grid-flow-row grid-cols-3 items-center">
          <div className="">
            <p className="dark:text-white text-dark font-semibold text-4xl">
              100+
            </p>
            <p className=" text-dark text-sm font-normal">Qualified Lawyers</p>
          </div>
          <div>
            <p className=" dark:text-white text-dark font-semibold text-4xl">
              350+
            </p>
            <p className="text-dark text-sm font-normal">Successfull Cases</p>
          </div>
          <div>
            <p className="dark:text-white text-dark font-semibold text-4xl">
              200+
            </p>
            <p className="text-dark text-sm font-normal">Trusted Clients</p>
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-11/12 md:w-10/12 lg:w-3/4 h-full md:h-3/4">
          <div className="w-full h-full flex flex-col md:flex-row items-center md:justify-center gap-x-4">
            <div className="w-full md:w-3/5 h-1/3 md:h-full relative mt-5 md:mt-0">
              <div className="absolute bottom-0 w-full h-1/2 bg-[#C6A85C70]"></div>
              <div className="absolute w-full h-full z-10">
                <img src={stairs} alt="stairs" className="w-3/4 h-full" />
              </div>
            </div>
            <div className="md:w-2/5 flex flex-col justify-between">
              <div className="text-2xl md:text-6xl font-semibold text-dark py-3 md:py-0">
                Get a lawyer in minutes!
              </div>
              <div>
                <div>
                  We are dedicated to providing legal professionals with a
                  comprehensive platform that streamlines the practice of law.
                  Our platform is designed to be user-friendly and efficient,
                  allowing lawyers to focus on their clients' needs rather than
                  administrative tasks.
                  <br />
                  <br />
                  You can easily manage your cases, documents, and billing, all
                  in one place. We are committed to continuously improving our
                  platform and services to best serve the needs of the legal
                  community.
                  <br />
                  <br />
                  Our professional services are provided by a team of
                  experienced attorneys and paralegals. With our comprehensive
                  platform and professional services, we strive to be a one-stop
                  shop for all of your legal practice management needs.
                </div>
              </div>
              <div>
                <button
                  className="bg-legalYellow text-white h-12 md:w-44 w-44 rounded-md mt-4"
                  onClick={() => {
                    navigate("/client-signup");
                  }}
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section 3 */}
      <div className="lg:pl-64 md:ml-4">
        <div className="md:flex flex-row pd:h-40 h-auto">
          <div className="md:w-1/2">
            <p className="md:text-6xl text-2xl font-bold text-dark md:px-0 px-4">
              Meet our <span className="text-legalYellow">TOP</span> expert
              legal team
            </p>
          </div>
          <div className="md:ml-14 md:mr-96 md:w-1/2 w-screen h-40 md:px-0 px-4 space-y-4">
            <p className="lg:text-xl align-baseline text-[#697472]">
              Legal space top expert legal team covering any field. They have
              more than 10 years experience in they specialization
            </p>
            <p className="lg:text-xl align-baseline text-[#697472]">
              Sign Up to join be part of the top lawyers team
            </p>
            <button
              className="bg-dark rounded-md text-white h-12 md:w-44 w-44 text-xs font-semibold"
              onClick={() => {
                navigate("/lawyer-signup");
              }}
            >
              Signup as Lawyer
            </button>
          </div>
        </div>
      </div>
      <div className="lg:pl-64 md:pl:4 -px-4">
        <Team />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
