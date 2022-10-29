import React from "react";
import six from "../../assets/images/Frame6.svg";
import three from "../../assets/images/Frame3.svg";
import four from "../../assets/images/Frame4.svg";
import five from "../../assets/images/Frame6.svg";
import Slider from "react-slick";

const Team = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
        },
      },
    ],
  };
  return (
    <div className="modules">
      <div className="grid md:grid-cols-4 gap-0 content-center column-parent">
        <div className="course-card rounded-xl drop-shadow-sm">
          <div className="h-3/4">
            <img
              src={three}
              alt=""
              className="h-full w-full object-fill rounded-md"
            />
          </div>

          <div className="pt-3 pl-3">
            <div className="module mb-3">Andrev Schurle</div>
          </div>
        </div>

        <div className="course-card rounded-xl drop-shadow-sm">
          <div className="h-3/4">
            <img
              src={six}
              alt=""
              className="h-full w-full object-fill rounded-md scale-100"
            />
          </div>

          <div className="pt-3 pl-3">
            <div className="module mb-3">Emille Buendia</div>
          </div>
        </div>

        <div className="course-card rounded-xl drop-shadow-sm">
          <div className="h-3/4">
            <img
              src={five}
              alt=""
              className="h-full w-full object-fill rounded-md"
            />
          </div>

          <div className="pt-3 pl-3">
            <div className="module mb-3">Brenda Brody</div>
          </div>
        </div>

        <div className="course-card rounded-xl drop-shadow-sm">
          <div className="h-3/4">
            <img
              src={four}
              alt=""
              className="h-full w-full object-fill rounded-md"
            />
          </div>

          <div className="pt-3 pl-3">
            <div className="module mb-3">Marcus Wayne </div>
          </div>
        </div>
      </div>

      {/*  mobile Slider */}

      <div className="mobile-slider hidden container-fluid">
        <Slider {...settings}>
          <div className="h-fit">
            <div className="course-card rounded-xl drop-shadow-sm h-full">
              <div className="h-5/6">
                <img
                  src={five}
                  alt="team"
                  className="h-full w-full object-fill rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="course-card rounded-xl drop-shadow-sm h-full">
              <div className="h-3/4">
                <img src={three} alt="team" className="" />
              </div>
            </div>
          </div>

          <div>
            <div className="course-card rounded-xl drop-shadow-sm">
              <div className="h-3/4">
                <img
                  src={five}
                  alt="team"
                  className="h-full w-full object-fill rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="course-card rounded-xl drop-shadow-sm">
              <div className="h-3/4">
                <img
                  src={six}
                  alt="team"
                  className="h-full w-full object-fill rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="course-card rounded-xl drop-shadow-sm">
              <div className="h-3/4">
                <img
                  src={four}
                  alt="team"
                  className="h-full w-full object-fill rounded-md"
                />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Team;
