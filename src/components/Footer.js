import React from "react";
import { Input } from "./ui";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import logo from "../assets/White2.svg";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/newsletter/subscribe`
      );
      toast.success("Subrscibed Successfully");
    } catch (err) {
      toast.error("Couldn't subscribe to newsletter. Try again later");
    }
  };

  return (
    <div className="mt-8 bottom-0 lg:px-72 md:px-20 sm:pt-8 sm:pb-14 text-white md:h-[400px] h-auto w-screen bg-dark pt-8 pl-8 pb-8 overflow-hidden">
      <div className="mb-8 space-y-3">
        <img src={logo} alt="logo" className="h-10" />
        <p className="text-legalLightGray text-sm">For the people.</p>
      </div>
      <div className="sm:grid grid-flow-row grid-cols-4 gap-4">
        <div className="mb-8">
          <p className="md:py-8 py-2">Address</p>
          <p className="text-legalLightGray">
            Suite 11 Side Offices Whitehouse
            <br />
            MandaHill Lusaka, Zambia
          </p>
        </div>
        <div className="mb-8">
          <p className="md:py-8 py-2">Contact</p>
          <p className="text-legalLightGray">
            Zambia: +260 764834476 <br />
            Kenya: +254 700125555 <br />
            care@twafwane.com
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

          <div className="text-white flex flex-row space-y-2">
            <form>
              <Input
                id="newsletter"
                name="newsletter"
                type="text"
                //   label="Subscribe to our newsletter"
                autoComplete="email"
                required
                onChange={null}
                placeholder="Enter your email"
                className="rounded-none"
              />

              <div
                className=" bg-legalYellow rounded-md flex items-center justify-center mt-2"
                // aria-hidden={true}
              >
                <button
                  className="py-2 "
                  type="submit"
                  onSubmit={() => {
                    handleSubmit();
                  }}
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="pt-20 md:pt-4 grid grid-cols-2 md:flex flex-row items-center md:space-x-4">
        <p className="text-[10px] md:text-sm text-[#98A6A4]">
          2022 copyright by LegalSPACE.
          <br className="md:hidden" /> All rights reserved <br /> Powered by
          Twafwane Innovations
        </p>
        <div className="h-[1px] md:w-3/5 w-32 bg-[#98A6A4]" />
      </div>
    </div>
  );
};

export default Footer;
