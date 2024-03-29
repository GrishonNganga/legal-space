import React, { useEffect, useState } from "react";
import six from "../../assets/wig.jpg";
import three from "../../assets/lawyer.jpeg";
import avatar from "../../assets/avatar.png";
import five from "../../assets/woman.jpeg";
import bendon from "../../assets/bendon.jpeg";
// import Slider from "react-slick";
import "./team.css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const teamData = [
  {
    image: three,
    name: "Rezin M'gode",
    role: "Head of Operations",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com/in/",
  },
  {
    image: five,
    name: "Precious Mulenga",
    role: "Head Sales and Marketing",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com/in/",
  },
  {
    image: six,
    name: "Kelvin Zimba",
    role: "Lead Counsel and Head of Legal",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com/in/",
  },
  {
    image: bendon,
    name: "Bendon Murgor",
    role: "Head of Tech",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com/in/",
  },
  // {
  //   image: five,
  //   name: "Brenda  Brody",
  //   role: "Sales Legal",
  //   facebook: "https://www.facebook.com",
  //   linkedin: "https://www.linkedin.com/in/",
  // },
  // {
  //   image: six,
  //   name: "Marcus Wayne ",
  //   role: "Sales Legal",
  //   facebook: "https://www.facebook.com",
  //   linkedin: "https://www.linkedin.com/in/",
  // },
  // {
  //   image: three,
  //   name: "Emille Buendia",
  //   role: "Sports Legal",
  //   facebook: "https://www.facebook.com",
  //   linkedin: "https://www.linkedin.com/in/",
  // },
  // {
  //   image: six,
  //   name: "Marcus Wayne ",
  //   role: "Sales Legal",
  //   facebook: "https://www.facebook.com",
  //   linkedin: "https://www.linkedin.com/in/",
  // },
];

const CustomArrowLeft = ({ className, onClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={`${className} h-10 w-10`}
      >
        <ArrowLeftCircleIcon to="prev" />
      </button>
    </div>
  );
};
const CustomArrowRight = ({ className, onClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={`${className} h-10 w-10 text-black`}
      >
        <ArrowRightCircleIcon to="next" />
      </button>
    </div>
  );
};

const Team = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const settings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 2,
    lazyLoad: true,
    // initialSlide: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const [buttonClicked, setButtonClicked] = useState("");

  useEffect(() => {
    setTimeout(() => setButtonClicked(""), 4000);
  }, [buttonClicked]);

  return (
    <div className="teams">
      <div className="">
        <div className="flex justify-end my-2">
          {/* <ButtonBack
         
          >
            <ArrowLeftCircleIcon />
          </ButtonBack>
          <ButtonNext
          
          >
            <ArrowRightCircleIcon />
          </ButtonNext> */}
        </div>
        <div className="hidden md:block">
          <CarouselProvider
            naturalSlideWidth={340}
            naturalSlideHeight={450}
            totalSlides={teamData.length}
            visibleSlides={4}
            infinite={true}
          >
            <div className="flex justify-end p-8">
              <ButtonBack>
                <ArrowLeftCircleIcon
                  onClick={() => {
                    setButtonClicked("prev");
                  }}
                  className={`h-10 w-10 ${
                    buttonClicked === "prev"
                      ? "text-legalYellow"
                      : "text-legalLightGray"
                  }`}
                />
              </ButtonBack>
              <ButtonNext>
                <ArrowRightCircleIcon
                  onClick={() => {
                    setButtonClicked("next");
                  }}
                  className={`h-10 w-10 ${
                    buttonClicked === "next"
                      ? "text-legalYellow"
                      : "text-legalLightGray"
                  }`}
                />
              </ButtonNext>
            </div>
            <Slider>
              {teamData.map((team, index) => (
                <Slide className="">
                  <div
                    key={index}
                    className="team-card drop-shadow-sm text-white"
                  >
                    <div className="h-2/3">
                      {team.image ? (
                        <img
                          src={team.image}
                          alt=""
                          className="w-full object-fit"
                        />
                      ) : (
                        <img
                          src={avatar}
                          alt=""
                          className="w-full object-fit bg-white"
                        />
                      )}
                    </div>
                    <div className=" pl-3">
                      <div className="module mb-3 flex flex-row justify-between px-4 items-start">
                        <div>
                          <p className="font-semibold">{team.name}</p>
                          <p className="font-light text-sm">{team.role}</p>
                        </div>
                        <div className="flex  flex-row space-x-4">
                          <a
                            href={team.facebook}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                          <a
                            href={team.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
        <div className="block md:hidden">
          <CarouselProvider
            naturalSlideWidth={340}
            naturalSlideHeight={450}
            totalSlides={teamData.length}
            visibleSlides={1}
            infinite={true}
          >
            <div className="flex justify-end md:p-8 p-4">
              <ButtonBack>
                <ArrowLeftCircleIcon
                  onClick={() => {
                    setButtonClicked("prev");
                  }}
                  className={`h-10 w-10 ${
                    buttonClicked === "prev"
                      ? "text-legalYellow"
                      : "text-legalLightGray"
                  }`}
                />
              </ButtonBack>
              <ButtonNext>
                <ArrowRightCircleIcon
                  onClick={() => {
                    setButtonClicked("next");
                  }}
                  className={`h-10 w-10 ${
                    buttonClicked === "next"
                      ? "text-legalYellow"
                      : "text-legalLightGray"
                  }`}
                />
              </ButtonNext>
            </div>
            <Slider>
              {teamData.map((team, index) => (
                <Slide className="">
                  <div
                    key={index}
                    className="bg-[#c6a85c] drop-shadow-sm text-white"
                  >
                    <div>
                      <img src={team.image} alt="" className="w-full" />
                    </div>
                    <div className="py-4 pl-3">
                      <div className="module mb-3 flex flex-row justify-between px-4 items-start">
                        <div>
                          <p className="font-semibold">{team.name}</p>
                          <p className="font-light text-sm">{team.role}</p>
                        </div>
                        <div className="flex  flex-row space-x-4">
                          <a
                            href={team.facebook}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                          <a
                            href={team.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
};

export default Team;
