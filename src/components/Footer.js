import React from "react";
import { Input } from "./ui";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <div className="mt-8 bottom-0 sm:px-80 sm:pt-8 sm:pb-14 text-white md:h-[400px] h-auto w-screen bg-dark pt-8 pl-8">
      <div className="mb-8 space-y-3">
        <p>LEGAL SPACE.IO</p>
        <p className="text-legalLightGray text-sm">For the people</p>
      </div>
      <div className="sm:grid grid-flow-row grid-cols-4">
        <div className="mb-8">
          <p className="md:py-8 py-2">Address</p>
        </div>
        <div className="mb-8">
          <p className="md:py-8 py-2">Contact</p>
          <p className="text-legalLightGray">
            +141 1234 5678 9100 <br />
            legalspace@legal.io
          </p>
        </div>
        <div className="mb-8">
          <p className="md:py-8 py-2">Office</p>
          <p className="text-legalLightGray">
            Monday - Friday <br />
            08.00 - 17.00
          </p>
        </div>
        <div className="py-8 flex flex-col md:items-center items-start justify-center space-y-4">
          <p>Subscribe to our newsletter</p>

          <div className="text-white flex flex-row space-x-2">
            <Input
              id="newsletter"
              name="newsletter"
              type="text"
              //   label="Subscribe to our newsletter"
              autoComplete="email"
              required
              onChange={null}
              placeholder="Enter your email"
            />

            <div
              className="h-10 w-10 bg-legalYellow flex items-center justify-center rounded"
              aria-hidden={true}
            >
              <a href="mailto:email@example.com" rel="noreferrer">
                <ArrowRightIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
