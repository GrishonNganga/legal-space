import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { json } from "react-router-dom";

function TopNavigation() {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    localStorage.setItem("clicked", JSON.stringify("clicked"));
  }, [clicked]);

  return (
    <div
      className={`h-14 ${
        clicked ? "hidden" : "flex"
      } items-center flex-row bg-black`}
    >
      <div className="flex flex-row min-w-full">
        <p className="text-sm text-white px-10">
          Ready to take your firm to the next level? Join over 200+ Legal space
          clients  
        </p>
        <button
          className="hidden sm:block outline border-white cursor-pointer text-white"
          type="button"
          onClick={() => setClicked(true)}
        >
          <p className="text-lg">See Video</p>
        </button>
      </div>
    </div>
  );
}

export default TopNavigation;
