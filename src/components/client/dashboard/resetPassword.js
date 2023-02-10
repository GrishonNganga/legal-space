import { useNavigate } from "react-router-dom";

import { userStore } from "../../../stores";

import { useState, useEffect } from "react";

import { Notification, Input, Button } from "../../ui";

import { userChangePassword } from "../../../data/controller";

const PasswordReset = ({ setMiddleTopNavText }) => {
    const navigate = useNavigate();
  
    const storeUser = userStore((state) => state.storeUser);
  
    const [passwordDetails, setPasswordDetails] = useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const [completedFields, setCompletedFields] = useState(false);
    const [info, setInfo] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setMiddleTopNavText("Password Reset");
    }, []);
  
    useEffect(() => {
      let completed = true;
      for (const key in passwordDetails) {
        if (passwordDetails[key] === "" || !passwordDetails[key]) {
          completed = false;
          break;
        }
      }
      if (
        passwordDetails.oldPassword.length < 5 ||
        passwordDetails.newPassword.length < 5
      ) {
        completed = false;
        return;
      }
  
      if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
        completed = false;
        return;
      }
  
      if (passwordDetails.newPassword === passwordDetails.oldPassword) {
        completed = false;
        return;
      }
  
      setCompletedFields(completed);
    }, [passwordDetails]);
  
    const changePassword = () => {
      setInfo({ message: "", type: "error" });
      for (const key in passwordDetails) {
        if (passwordDetails[key] === "" || !passwordDetails[key]) {
          setInfo({ message: `${key} can't be empty`, type: "error" });
          return;
        }
      }
      setLoading(true);
      userChangePassword({
        oldPassword: passwordDetails.oldPassword,
        newPassword: passwordDetails.newPassword,
      }).then((response) => {
        setLoading(false);
        if (response?.status === "success") {
          setInfo({
            message: `Password changed successfully, please login again`,
            type: "success",
          });
          setTimeout(() => {
            storeUser(null);
            navigate("/signin");
          }, 1000);
        } else {
          setInfo({ message: response?.message, type: "error" });
        }
      });
    };
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-screen">
        <div>
          <Notification type={info.type} message={info.message} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col h-full">
            <div>
              <div className="mt-1">
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  label="Old Password"
                  autoComplete="false"
                  placeholder={"********"}
                  required
                  onChange={(e) => {
                    setPasswordDetails((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  label="New Password"
                  autoComplete="false"
                  placeholder={"********"}
                  required
                  onChange={(e) => {
                    setPasswordDetails((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder={"********"}
                  autoComplete="false"
                  required
                  onChange={(e) => {
                    setPasswordDetails((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Button
              text="Save changes"
              type={"secondary"}
              active={completedFields}
              onClick={changePassword}
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  };

  export default PasswordReset;