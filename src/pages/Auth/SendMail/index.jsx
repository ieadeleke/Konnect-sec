import { LoadingOutlined } from "@ant-design/icons";
import { Input, Spin, notification } from "antd";
import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  _change_password_email,
  _verify_email_code,
  _verify_passcode,
} from "../../../common/axios_services";

import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

const SendMail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const emailRef = useRef(null);
  const passcodeRef = useRef(null);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
  );

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: "",
      placement: "bottomRight",
      title,
      description: message,
    });
  };

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      emailAddress: "",
      passcode: "",
    },
  });

  const changePasswordEmail = async ({ email }) => {
    try {
      const response = await _change_password_email({ email });
      setSendingMessage(false);
      navigate("/verify-passcode");
      openNotificationWithIcon(
        "success",
        response?.data?.title,
        response?.data?.message
      );
    } catch (err) {
      setSendingMessage(false);
      if (err?.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        openNotificationWithIcon("error", "Something went wrong", err?.message);
      }
    }
  };

  const verifyEmailCode = async ({ email, passcode }) => {
    try {
      const response = await _verify_email_code({ email, passcode });
      if (response?.data?.status === "success") {
        setSendingMessage(false);
        localStorage.removeItem("pendingVerificationEmail");

        if (localStorage.getItem("konnectnewaccountcreated")) {
          navigate("/signupsuccessful");
        } else {
          navigate("/signin");
        }

        openNotificationWithIcon(
          "success",
          response?.data?.title,
          response?.data?.message
        );
      } else {
        throw new Error("Email verification failed. Please try again.");
      }
    } catch (err) {
      setSendingMessage(false);
      if (err?.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        openNotificationWithIcon("error", "Something went wrong", err?.message);
      }
    }
  };

  const verifyPasscode = async ({ email, passcode }) => {
    try {
      const response = await _verify_passcode({
        email,
        passcode,
        type: "periodic",
      });

      if (response?.data?.status === "success") {
        setSendingMessage(false);
        navigate(
          `/auth/reset-password/${response.data.data.id}/${response.data.data.token}`
        );
        openNotificationWithIcon(
          "success",
          response?.data?.title,
          response?.data?.message
        );
      } else {
        throw new Error("Passcode verification failed. Please try again.");
      }
    } catch (err) {
      setSendingMessage(false);
      if (err?.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        openNotificationWithIcon("error", "Something went wrong", err?.message);
      }
    }
  };

  const submitHandler = ({ emailAddress, passcode }) => {
    setSendingMessage(true);
    const email = emailAddress.trim();
    const code = passcode?.trim();

    if (location.pathname === "/verify-email") {
      verifyEmailCode({ email, passcode: code });
    } else if (location.pathname === "/verify-passcode") {
      verifyPasscode({ email, passcode: code });
    } else {
      changePasswordEmail({ email });
    }
  };

  useEffect(() => {
    if (location.pathname === "/verify-email") {
      const savedEmail = localStorage.getItem("pendingVerificationEmail");
      if (savedEmail) {
        setValue("emailAddress", savedEmail);
      }
    }
  }, [location.pathname, setValue]);

  useEffect(() => {
    if (
      location.pathname === "/verify-email" ||
      location.pathname === "/verify-passcode"
    ) {
      passcodeRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }
  }, [location.pathname]);

  const isVerifyEmail = location.pathname === "/verify-email";
  const isVerifyPasscode = location.pathname === "/verify-passcode";

  const heading = isVerifyEmail
    ? "Verify email by passcode"
    : isVerifyPasscode
    ? "Verify passcode"
    : "Amend your password!";

  const description = isVerifyEmail
    ? "Enter your email address to verify your email. Get richer each day with Wise9ja. Enjoy free delivery and cashback when you shop."
    : isVerifyPasscode
    ? ""
    : "Enter your email address to change your password. Get richer each day with Wise9ja. Enjoy free delivery and cashback when you shop.";

  const buttonText = isVerifyEmail
    ? "Verify Email"
    : isVerifyPasscode
    ? "Verify Passcode"
    : "Reset Password";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 items-center py-20 justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h3 className="text-xl font-bold mb-1">{heading}</h3>
          <p className="text-gray-600 mb-4 text-sm leading-normal">{description}</p>
          {errorMessage && (
            <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(submitHandler)} autoComplete="off">
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium mb-1"
              >
                Email address
              </label>
              <Controller
                control={control}
                name="emailAddress"
                render={({ field }) => (
                  <Input
                    {...field}
                    ref={emailRef}
                    id="emailAddress"
                    type="email"
                    className="h-12"
                    autoComplete="off"
                    autoFocus={!isVerifyEmail && !isVerifyPasscode}
                  />
                )}
              />
            </div>

            {/* Passcode */}
            {(isVerifyEmail || isVerifyPasscode) && (
              <div className="mb-4">
                <label
                  htmlFor="passcode"
                  className="block text-sm font-medium mb-1"
                >
                  Passcode
                </label>
                <Controller
                  control={control}
                  name="passcode"
                  render={({ field }) => (
                    <Input
                      {...field}
                      ref={passcodeRef}
                      id="passcode"
                      className="h-12"
                      autoComplete="off"
                      autoFocus={isVerifyEmail || isVerifyPasscode}
                    />
                  )}
                />
              </div>
            )}

            {/* Submit */}
            <div className="mt-6">
              {!sendingMessage ? (
                <button
                  id="submit-form"
                  type="submit"
                  className="w-full h-12 bg-primary text-white font-medium rounded-md transition"
                >
                  {buttonText}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full h-12 bg-primary text-white font-medium rounded-md flex items-center justify-center"
                >
                  <Spin indicator={antIcon} />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SendMail;
