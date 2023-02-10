import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userStore } from "../../../stores";
import { Notification, Toggle, Button, Input } from "../../ui";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import { editUser, userChangePassword } from "../../../data/controller";

const ClientProfile = ({ setMiddleTopNavText }) => {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  const [info, setInfo] = useState({ message: "", type: "" });
  const storeUser = userStore((state) => state.storeUser);
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMiddleTopNavText("My Profile");
  }, []);

  const updateUser = (details) => {
    setLoading(true);
    editUser(details).then((response) => {
      setLoading(false);
      if (response?.status === "success") {
        const updatedUser = { ...user, ...response?.data?.user };
        storeUser(updatedUser);
        setUserDetails();
        setInfo({ type: "success", message: `Profile updated successfully` });
      } else {
        setInfo({ type: "error", message: response.message });
      }
    });
  };

  return (
    <div className="w-full py-4 px-2">
      <div className="w-full max-w-7xl mx-auto sm:px-6 md:px-8">
        <div>
          <Notification type={info.type} message={info.message} />
        </div>

        <div className="w-full py-4 flex flex-col">
          <div className="w-full flex flex-col items-center gap-y-4 flex-wrap">
            <div className="w-1/2">
              <img
                src={
                  user?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"
                }
                className=""
                alt=""
              />
            </div>
            <div className="text-lg">
              <span>{user?.firstName}</span> <span>{user?.lastName}</span>
            </div>
            <div className="grow-0 w-full text-center text-sm font-normal text-gray-300 truncate">
              <span>{user?.email}</span>
            </div>

            <div className="w-full flex flex-col p-3 px-5 divide-y">
              <div className="flex justify-between p-4">
                <div className="text-gray-400">User Name</div>
                <div>
                  <span>{user?.firstName}</span> <span>{user?.lastName}</span>
                </div>
              </div>
              <div className="flex justify-between p-4">
                <div className="text-gray-400">Email</div>
                <div>{user?.email}</div>
              </div>
              <div className="flex justify-between p-4">
                <div
                  className="text-gray-400"
                  onClick={() => {
                    navigate("/dashboard/password-reset");
                  }}
                >
                  Reset Password
                </div>
                <div>************</div>
              </div>

              <div className="flex justify-between p-4">
                <div
                  className="text-gray-400"
                  onClick={() => {
                    navigate("previous-engagements");
                  }}
                >
                  My Cases
                </div>
              </div>

              <div className="mt-3">
                <Button
                  text="Done"
                  type="secondary"
                  active={true}
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;

const PreviousEngagements = ({ setMiddleTopNavText }) => {
  const [engagements, setEngagements] = useState([]);
  const user = userStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMiddleTopNavText("Engagements");
  }, []);

  return (
    <div className="w-full py-4 px-2">
      <div className="w-full max-w-7xl mx-auto sm:px-6 md:px-8">
        {/* Replace with your content */}
        <div className="flex flex-col gap-y-5 p-3">
          {(!loading &&
            engagements?.map((engagement, idx) => {
              if (
                engagement?.stage === "completed" ||
                engagement?.stage === "closed"
              ) {
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-y-3 shadow-md p-5 rounded-md"
                  >
                    <div className="flex gap-x-2 items-start">
                      <img
                        src={
                          engagement?.image ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"
                        }
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold text-base flex gap-x-1">
                          <span>{engagement?.clientId?.firstName}</span>
                          <span>{engagement?.clientId?.lastName}</span>
                        </div>
                        <div className="flex gap-x-3 items-center">
                          <div className=" text-gray-400 text-sm">
                            {engagement?.subject}
                          </div>
                          {user?.location && (
                            <div className="w-1 h-1 bg-gray-400"></div>
                          )}
                          <div className="-ml-2 text-xs text-gray-500">
                            {user?.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex gap-x-2 mt-3">
                        <div>Date</div>
                        <div>
                          {new Date(engagement?.date)?.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-x-2 mt-3">
                        <div>Time</div>
                        <div>
                          {new Date(engagement?.date)?.toLocaleTimeString([], {
                            hour12: true,
                          })}
                        </div>
                      </div>
                      <div className="mt-5">{engagement?.description}</div>
                    </div>
                    {engagement?.stage === "closed" && (
                      <div className="w-full flex mt-4">
                        <div>
                          <div className="border border-red-500 px-4 py-2 rounded-md text-red-500">
                            Closed
                          </div>
                        </div>
                      </div>
                    )}
                    {engagement?.stage === "completed" && (
                      <div className="w-full flex mt-4">
                        <div>
                          <div className="border border-green-500 px-4 py-2 rounded-md text-green-500">
                            Completed
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })) ||
            (loading &&
              [...Array(3)].map((idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-y-3 shadow-md p-5 rounded-md"
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
                    <div className="flex flex-col gap-y-4">
                      <div className="flex gap-x-2 mt-3 w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
                      <div className="flex gap-x-2 mt-3 w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
                      <div className="flex gap-x-2 mt-3 w-full h-20 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                  </div>
                );
              }))}
        </div>
      </div>
    </div>
  );
};
