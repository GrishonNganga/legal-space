import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import { Input } from "../../ui";
import {
  getLawyers,
  getAllAreasOfPractice,
  getLawyersPerCategory,
} from "../../../data/controller";
import { userStore } from "../../../stores";

const Main = ({ setMiddleTopNavText }) => {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  const setLawyer = userStore((state) => state.setLawyer);
  const [allLawyers, setAllLawyers] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setMiddleTopNavText("Lawyerspace.io");

    setLoadingCategories(true);
    getAllAreasOfPractice().then((response) => {
      setLoadingCategories(false);
      if (response?.status === "success") {
        setCategories(response.data.categories);
      }
    });

    setLoading(true);
    getLawyers().then((response) => {
      setLoading(false);
      if (response?.status === "success") {
        setAllLawyers(response.data.lawyers);
      }
    });
  }, []);

  useEffect(() => {
    if (allLawyers?.length > 0) {
      setLawyers(allLawyers);
    }
  }, [allLawyers]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setLawyers(allLawyers);
    } else {
      setLoading(true);
      getLawyersPerCategory(selectedCategory).then((response) => {
        setLoading(false);
        if (response?.status === "success") {
          setLawyers(response?.data?.category?.lawyers);
        } else {
          setLawyers([]);
        }
      });
    }
  }, [selectedCategory]);

  return (
    <div className="p-2">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-gray-900">Hello {user?.firstName}</h1>
        <h1 className="mt-2 font-semibold text-[#183A33] text-xl">
          Find the best lawyers here
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        {/* Replace with your content */}
        <div className="py-4">
          <div className="flex justify-between items-center gap-x-2 ">
            <div className="w-full">
              <Input
                type={"text"}
                placeholder="Search anything here"
                Icon={MagnifyingGlassIcon}
                className="pl-8 placeholder-legalGreen text-legalGreen z-50 border-0 bg-gray-100"
                iconClassName={"text-legalGreen ml-2"}
              />
            </div>
            <div>
              <div className="bg-[#DEAB52] p-1.5 rounded-md mt-2">
                <AdjustmentsHorizontalIcon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="font-semibold text-md">Category</div>
            <div className="font-semibold text-gray-400 text-sm">View all</div>
          </div>
          <div className="mt-5 flex gap-x-2 overflow-scroll no-scrollbar text-sm">
            {!loadingCategories && (
              <div
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === "all"
                    ? "bg-dark border-[#DEAB52] text-white w-20 flex justify-center"
                    : "border w-20 flex justify-center border-legalGreen text-gray-500"
                }`}
                onClick={() => {
                  setSelectedCategory("all");
                }}
              >
                All
              </div>
            )}
            {!loadingCategories &&
              categories?.map((category, idx) => {
                return (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-md ${
                      selectedCategory === category?._id
                        ? "bg-dark border-[#DEAB52] text-white w-20 flex justify-center"
                        : "border border-legalGreen text-gray-500 w-20 flex justify-center"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category._id);
                    }}
                  >
                    {category?.title}
                  </div>
                );
              })}
            {loadingCategories &&
              [...Array(4)].map((idx) => {
                return (
                  <div
                    key={idx}
                    className="px-4 py-2 w-40 h-10 bg-gray-300 animate-pulse rounded-md"
                  ></div>
                );
              })}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="font-semibold text-md">Top lawyers near you</div>
            <div className="font-semibold text-gray-400 text-sm">View all</div>
          </div>
          <div className="mt-5 flex flex-col gap-y-4">
            {!loading &&
              lawyers?.map((lawyer) => {
                return (
                  <div
                    key={lawyer?._id}
                    className="flex justify-between items-center bg-white p-2 rounded-md"
                    onClick={() => {
                      setLawyer(lawyer);
                      navigate(`lawyer/${lawyer?._id}`);
                    }}
                  >
                    <div className="flex gap-x-2 items-center">
                      <div className="shrink-0 w-10 h-10">
                        <img
                          src={
                            lawyer?.image ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"
                          }
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold text-base">
                          <span>{lawyer?.firstName} </span>{" "}
                          <span>{lawyer?.lastName}</span>
                        </div>
                        <div className="flex gap-x-3 items-center">
                          <div className=" text-gray-400 text-sm">
                            Criminal representation
                          </div>
                          {user?.location && (
                            <div className="w-1 h-1 bg-gray-400"></div>
                          )}
                          <div className="-ml-2 text-xs text-gray-500">
                            {lawyer?.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    {lawyer?.rating && (
                      <div className="flex gap-x-1 items-center">
                        <div>
                          <StarIcon className="w-5 h-5 text-[#DEAB52]" />
                        </div>
                        {lawyer?.rating && (
                          <div className="text-xs text-[#DEAB52]">
                            {lawyer?.rating}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            {loading &&
              [...Array(6)].map((idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full flex flex-col gap-y-3 shadow-lg p-5 rounded-md"
                  >
                    <div className="w-full flex gap-x-2 items-start h-full">
                      <div>
                        <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <div className="font-semibold text-base w-1/2 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                        <div className="font-semibold text-base w-1/2 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* /End replace */}
      </div>
    </div>
  );
};

export default Main;
