import React from "react";
import NavBar from "../components/Navbar";
// import TopNavigation from '../components/TopNavigation';
import woman from "../assets/images/woman.svg";
import gavel from "../assets/images/gavel.svg";
import stairs from "../assets/images/stairs.svg";
import six from "../assets/images/Frame6.svg";
import three from "../assets/images/Frame3.svg";
import four from "../assets/images/Frame4.svg";
import five from "../assets/images/Frame6.svg";
import Footer from "../components/Footer";
import Team from "../components/landing/Team";

const Homepage = () => {
  return (
    <div className="overflow-hidden">
      {/* <TopNavigation /> */}
      <NavBar />
      <div className="lg:px-64 md:px-4 md:pt-40 md:flex flex-row bg-dark lg:h-screen">
        <div className="md:flex w-screen md:w-1/2 flex-col text-white mr-4">
          <p className="text-lg font-normal text-legalLightGray">
            EXPERIENCE COMFORT
          </p>
          <div className="md:block mb-10">
            <p className="md:text-6xl text-4xl">
              Advocating for <span className="text-legalYellow">YOU</span>,
            </p>
            <p className="md:text-7xl text-4xl">
              we are for the <span className="text-legalYellow">PEOPLE</span>
            </p>
          </div>
          {/* <div className="md:hidden w-screen">
            <p className="text-2xl text-dark dark:text-white font-semibold">
              Advocating for YOU, <br /> we are for the <br /> PEOPLE
            </p>
          </div> */}
          <p className="text-lg text-legalLightGray">
            We are ready to help whatever legal problem you are experiencing. We
            will help with our best lawyers. Hesitant? You can consult for free!
          </p>
          <div
            className="w-[660px] h-44 px-6 bg-accent-3-dark grid grid-flow-row grid-cols-3 items-center justify-center md:mt-32
"
          >
            <div>
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
        <div className="w-screen md:w-1/2 lg:ml-60">
          <div className="h-[570px] w-2/3 lg:w-[430px] relative">
            <img src={woman} alt="woman" className="scale-100" />
            <div className="absolute lg:-left-36 lg:-bottom-36 md:-left-20 md:-bottom-20 lg:w-[300px] lg:h=[440px]">
              <img
                src={gavel}
                alt="gavel"
                className="scale-100 lg:w-72 lg:h-96 md:w-52 md:h-80"
              />
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* section 2 */}
      <div className="pt-20 md:flex">
        <div className="w-screen lg:ml-64 md:ml-4 md:w-1/2">
          <div className="lg:w-[450px] w-screen md:w-full lg:h-[600px]">
            <img
              src={stairs}
              alt="man"
              className="lg:scale:100 flex flex-grow"
            />
          </div>
        </div>
        <div className="w-screen md:w-1/2 mr-64">
          <div>
            <p className="text-4xl text-dark dark:text-white font-semibold leading-relaxed tracking-wide">
              Get a lawyer in minutes!
            </p>
          </div>
          <div>
            <p className="text-legalLightGray justify-center">
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
          <div>
            <button className="bg-primary text-white h-16 md:w-60 w-44 ml-8">
              Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* section 3 */}
      {/* <div className="hidden md:block lg:pl-64 md:ml-4">
        <div className="md:flex flex-row mt-24 md:h-40 h-auto">
          <div className="w-1/2">
            <p className="md:text-6xl text-2xl text-dark">
              Meet our <span className="text-legalYellow">TOP</span> <br />{" "}
              expert legal team
            </p>
          </div>
          <div className="md:ml-14 md:mr-96 md:w-1/2 w-screen h-40">
            <p className="text-base align-baseline text-legalLightGray">
              Legal space top expert legal team covering any field. They have
              more than 10 years experience in they specialization
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-row justify-end md:mr-64">
          <div className="rounded-full h-10 w-10 bg-legalLightGray">
            <img src="/" alt="arrow-left" />l
          </div>
          <div className="rounded-full h-10 w-10 bg-legalLightGray">
            <img src="/" alt="arrow-left" />r
          </div>
        </div>
        <div className="md:flex flex-row">
          <div className="mb-8 mx-2">
            <img src={six} alt="six" />
            <div className="bg-primary h-28 flex w-full justify-between md:mr-14 mr-8">
              <div className="grid text-white items-center flex-col px-8">
                <p>Andrev Schurle</p>
                <p>Bussiness legal</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="mb-8 mx-2">
            <img src={five} alt="team" />
            <div className="bg-primary h-28 flex w-full justify-between md:mr-14 mr-8">
              <div className="grid text-white items-center flex-col px-8">
                <p>Emille Buendia</p>
                <p>Bussiness legal</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="mb-8 mx-2">
            <img src={four} alt="team" />
            <div className="bg-primary h-28 flex justify-between w-full md:mr-14 mr-8">
              <div className="grid text-white items-center flex-col px-8">
                <p>Brenda Brody</p>
                <p>Bussiness legal</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="mx-2">
            <img src={three} alt="team" />
            <div className="bg-primary h-28 flex justify-between w-full md:mr-14 mr-8">
              <div className="grid text-white items-center flex-col px-8">
                <p>Marcus Wayne</p>
                <p>Bussiness legal</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* section 3 mobile */}
      <div className="lg:pl-64 md:ml-4">
        <div className="md:flex flex-row mt-24 pd:h-40 h-auto">
          <div className="w-1/2">
            <p className="md:text-6xl text-2xl text-dark">
              Meet our <span className="text-legalYellow">TOP</span> <br />{" "}
              expert legal team
            </p>
          </div>
          <div className="md:ml-14 md:mr-96 md:w-1/2 w-screen h-40">
            <p className="text-base align-baseline text-legalLightGray">
              Legal space top expert legal team covering any field. They have
              more than 10 years experience in they specialization
            </p>
          </div>
        </div>
      </div>
      <div className="lg:pl-64 md:pl:4">
      <Team />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
