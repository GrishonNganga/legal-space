import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import woman from "../assets/images/woman.svg";
import gavel from "../assets/images/gavel.svg";
import stairs from "../assets/images/stairs.svg";
import Footer from "../components/Footer";
import Team from "../components/landing/Team";
import squigly from "../assets/images/squigly.png";
import { Button } from "../components/ui";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden font-euclid">
      <NavBar />
      <div className="lg:px-auto md:px-4 md:pt-72 pt-44 pl-4 md:flex flex-row bg-dark md:h-[965px] h-[800px] overflow-hidden">
        <div className="md:flex lg:ml-64 w-screen md:w-1/2 flex-col text-white mr-4">
          <p className="text-lg font-normal text-legalLightGray">
            EXPERIENCE COMFORT
          </p>
          <div className="md:block mb-10 font-semibold">
            <p className="md:text-6xl text-4xl">
              Advocating for <span className="text-legalYellow">YOU</span>,
            </p>
            <p className="md:text-7xl text-4xl">
              we are for the{" "}
              <span className="text-legalYellow">
                <br />
                PEOPLE
              </span>
            </p>
            <img
              src={squigly}
              alt="squigly thing"
              className="hidden md:block"
            />
            <img src={squigly} alt="squigly thing" className="md:hidden w-40" />
          </div>
          {/* <div className="md:hidden w-screen">
            <p className="text-2xl text-dark dark:text-white font-semibold">
              Advocating for YOU, <br /> we are for the <br /> PEOPLE background: #C6A85C70;

            </p>
          </div> */}
          <p className="md:text-lg text-[10px] text-legalLightGray">
            We are ready to help whatever legal problem you are experiencing. We
            will help with our best lawyers. Hesitant? You can consult for free!
          </p>

          {/* desktop satisfied  clients background: #FFFFFF1A;
           */}
          <div
            className=" hidden md:grid w-[660px] bg-[#FFFFFF1A] h-44 px-6 bg-accent-3-dark grid-flow-row grid-cols-3 items-center justify-center md:mt-32
"
          >
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

          {/* conjoined images mobile */}
          <div className=" flex justify-end md:hidden pr-8 mt-8">
            <div className="h-[275px] w-[205px] relative">
              <img src={woman} alt="woman" />
              <div className="w-[159px] h-[240px] absolute -left-24 -bottom-36">
                <img src={gavel} alt="gavel" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-screen md:w-1/2 lg:ml-60">
          <div className="h-[570px] w-2/3 lg:w-[430px] relative">
            <img src={woman} alt="woman" className="scale-100" />
            <div className="absolute lg:-left-36 lg:-bottom-32 md:-left-20 md:-bottom-20 lg:w-[300px] lg:h=[440px]">
              <img
                src={gavel}
                alt="gavel"
                className="scale-100 lg:w-72 lg:h-96 md:w-52 md:h-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* clients satisfied mobile */}
      <div className="h-[105px] bg-[#C5CAC9] md:hidden flex items-center justify-between space-x-4 px-4 text-white">
        <div>
          <p className="text-3xl font-semibold">100+</p>
          <p className="text-dark text-sm">Qualified Lawyers</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">350+</p>
          <p className="text-dark text-sm">Successful Cases</p>
        </div>
        <div>
          <p className="text-3xl font-semibold">200+</p>
          <p className="text-dark text-sm">Trusted Clients</p>
        </div>
      </div>

      {/* section 2 */}
      <div className="pt-20 md:flex">
        <div className="hidden md:block w-screen lg:ml-64 md:ml-4 md:w-1/2">
          <div className="lg:w-[450px] w-screen md:w-full">
            <div className="bg-[#C6A85C70] h-80 w-[600px] relative -right-[1px] mt-56" />

            <img
              src={stairs}
              alt="man"
              className="lg:scale:100 flex flex-grow h-[512px] w-[455px] absolute -bottom-[622px]"
            />
          </div>
        </div>

        {/* stairs mobile */}
        <div className="md:hidden h-80 pt-24 px-4">
          <div className="relative bg-[#C6A85C70] h-36">
            <div className="absolute -leftx-[2px] -top-[124px]">
              <img src={stairs} alt="stairs" className="h-[300px] w-[200px]" />
            </div>
          </div>
        </div>
        <div className="w-screen md:w-1/2 mr-64 space-y-4">
          <div className="">
            <p className="text-6xl font-semibold text-dark md:px-0 px-4">
              Get a lawyer in minutes!
            </p>
          </div>
          <div>
            <p className="justify-center md:px-0 px-4 md:text-lg font-normal text-[#697472]">
              t vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occ t
              <br />
              <br />
              vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occ t
              <br />
              <br />
              vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occ
            </p>
          </div>
          <div className="flex justify-center md:justify-start pt-8 text-xs font-semibold">
            <button
              className="bg-legalYellow text-white h-12 md:w-44 w-44 rounded-md"
              onClick={() => {
                navigate("/client-signup");
              }}
            >
              Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className="lg:pl-64 md:ml-4">
        <div className="md:flex flex-row mt-32 pd:h-40 h-auto">
          <div className="w-1/2">
            <p className="md:text-6xl text-2xl font-bold text-dark md:px-0 px-4">
              Meet our <span className="text-legalYellow">TOP</span> <br />{" "}
              expert legal team
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
