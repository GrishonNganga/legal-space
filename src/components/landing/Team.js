import React, { useEffect, useState } from "react";
import six from "../../assets/images/Frame6.svg";
import three from "../../assets/images/Frame3.svg";
import four from "../../assets/images/Frame4.svg";
import five from "../../assets/images/Frame6.svg";
import Slider from "react-slick";
import "./team.css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const teamData = [
  {
    image: three,
    name: "Emille Buendia",
    role: "Sports Legal",
  },
  {
    image: four,
    name: "EAndrev Schurle",
    role: "Business Legal",
  },
  {
    image: five,
    name: "Brenda  Brody",
    role: "Sales Legal",
  },
  {
    image: six,
    name: "Marcus Wayne ",
    role: "Sales Legal",
  },
  {
    image: six,
    name: "Marcus Wayne ",
    role: "Sales Legal",
  },
  {
    image: six,
    name: "Marcus Wayne ",
    role: "Sales Legal",
  },
  {
    image: six,
    name: "Marcus Wayne ",
    role: "Sales Legal",
  },
  {
    image: six,
    name: "Marcus Wayne ",
    role: "Sales Legal",
  },
];

const Team = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [clicked, setClicked] = useState(false);
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
    setTimeout(() => setButtonClicked(""), 5000);
  }, [buttonClicked]);

  return (
    <div className="teams">
      {/* <div className="grid md:grid-cols-4 content-center">
        {teamData.map((team, index) => (
          <div
            key={index}
            className="team-card drop-shadow-sm bg-legalYellow text-white"
          >
            <div className="h-3/4 w-full">
              <img
                src={team.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pt-3 pl-3">
              <div className="module mb-3">
                <p>{team.name}</p>
                <p>{team.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="">
        <div className="flex justify-end">
          <button
            onCLick={sliderRef?.slickPrev}
            className={`h-10 w-10 ${
              buttonClicked === "prev"
                ? "text-legalYellow"
                : "text-legalLightGray"
            }`}
            onClick={() => setButtonClicked("prev")}
          >
            <ArrowLeftCircleIcon />
          </button>
          <button
            onCLick={sliderRef?.slickNext}
            className={`h-10 w-10 ${
              buttonClicked === "next"
                ? "text-legalYellow"
                : "text-legalLightGray"
            }`}
            onClick={() => setButtonClicked("next")}
          >
            <ArrowRightCircleIcon />
          </button>
        </div>
        {/* <Slider ref={setSliderRef} {...settings}>
          <div className="">
            <div className="team-card drop-shadow-sm h-full">
              <div className="h-5/6">
                <img
                  src={five}
                  alt="team"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {teamData.map((team, index) => (
            <div
              key={index}
              className="team-card drop-shadow-sm bg-legalYellow"
            >
              <div className="">
                <img
                  src={team.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pt-3 pl-3">
                <div className="module mb-3">
                  <p>{team.name}</p>
                  <p>{team.role}</p>
                </div>
              </div>
            </div>
          ))}

          <div>
            <div className="team-card drop-shadow-sm">
              <div className="h-3/4">
                <img
                  src={five}
                  alt="team"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="team-card drop-shadow-sm">
              <div className="">
                <img
                  src={six}
                  alt="team"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Slider> */}
        <Slider {...settings} ref={setSliderRef}>
          {teamData.map((team, index) => (
            <div
              key={index}
              className="team-card drop-shadow-sm text-white flex flex-row"
            >
              <div>
                <img src={team.image} alt="" className="object-cover" />
              </div>
              <div className="pt-3 pl-3">
                <div className="module mb-3">
                  <p>{team.name}</p>
                  <p>{team.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Team;
