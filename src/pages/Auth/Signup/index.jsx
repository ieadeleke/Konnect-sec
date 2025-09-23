import { Button, Form, Input, Select, notification } from "antd";
import NaijaStates from "naija-state-local-government";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../common/axios_call";
import {
  _validate_referral_code,
  _get_cities_by_state_code,
} from "../../../common/axios_services";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../slices/authSlice";


const Signup = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const firstNameInputRef = useRef(null);
  let url = new URLSearchParams(window.location.search);

  const [errorMessage, setErrorMessage] = useState("");
  const [appLoading, setAppLoading] = useState(false);

  const [referralCode, setReferralCode] = useState(
    new URLSearchParams(window.location.search).get("konnectrfc") ||
      localStorage.getItem("referralCode") ||
      ""
  );
  const [redirectUrl] = useState(
    url.get("konnectrd") ? url.get("konnectrd") : ""
  );
  const [referralDetails, setReferralDetails] = useState(false);
  const [loadingReferralDetails, setLoadingReferralDetails] = useState(false);
  const [allStates] = useState(NaijaStates.states());
  const [allLgas, setAllLgas] = useState([]);
  const [isSo, setIsSo] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [all_lgas, set_all_lgas] = useState([]);

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      placement: "bottomRight",
      message: title ? title : "",
      description: message ? message : "",
    });
  };

  const fetchCities = async (state_code = "LA", keyword = "") => {
    try {
      const uploadedCities = await _get_cities_by_state_code(
        state_code,
        keyword
      );
      set_all_lgas(uploadedCities.data.data);
    } catch (err) {
      openNotificationWithIcon("error", err.message);
      set_all_lgas([]);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode);
    }
  }, [referralCode]);

  const updateReferralCode = async (values) => {
    if (values?.referralCode?.length === 6) {
      setLoadingReferralDetails(true);
      try {
        const validate_referral_code = await _validate_referral_code({
          code: `${values.referralCode}`,
        });
        setLoadingReferralDetails(false);
        setErrorMessage(false);
        if (validate_referral_code?.data?.data?.is_sl) {
          setReferralDetails(validate_referral_code?.data?.data);
        } else {
          setReferralDetails(false);
          form.setFieldsValue({ state: "", lga: "", home_address: "" });
        }
      } catch (err) {
        form.setFieldsValue({ referralCode: "" });
        setReferralDetails(false);
        setLoadingReferralDetails(false);
        if (err.response) {
          setErrorMessage(err?.response?.data?.message);
        } else {
          openNotificationWithIcon(
            "error",
            "Something went wrong",
            err.message
          );
        }
      }
    } else if (values?.referralCode?.length < 6) {
      setLoadingReferralDetails(false);
      setReferralDetails(false);
      form.setFieldsValue({ state: "", lga: "", home_address: "" });
    }
  };

  const signupUser = (values) => {
    setAppLoading(true);
    setErrorMessage("");
    let {
      first_name,
      last_name,
      email,
      password,
      referralCode,
      home_address,
      lga,
      state,
    } = values;

    const defaultCode = referralCode ? referralCode : null;

    axios
      .post("/auth/sign-up/user", {
        lga,
        state,
        first_name,
        last_name,
        email,
        password,
        confirm_password: password,
        referral_code: defaultCode,
        image: "",
        home_address,
        phone_code: countryCode,
        phone_number: phoneNumber,
        role_id: 1,
        is_ra: false,
        app: "web",
        is_so: isSo,
      })
      .then(async (res) => {
        setAppLoading(false);
        if (res?.data?.status === "error") {
          return setErrorMessage(res.data.message);
        }

        localStorage.setItem("konnectnewaccountcreated", "true");
        localStorage.setItem("pendingVerificationEmail", values.email);

        const signInData = {
          email,
          password,
          app: "web",
          device_id: "",
          device_type: "",
          role_id: 1,
        };

        const result = await dispatch(loginUser(signInData)).unwrap();
        if (
          result?.user?.is_restaurant ||
          result?.user?.is_vendor ||
          result?.user?.is_so
        ) {
          navigate("/restaurant/dashboard");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err?.response?.data?.message);
        } else {
          setErrorMessage(false);
          openNotificationWithIcon(
            "error",
            "Something went wrong",
            err.message
          );
        }
        setAppLoading(false);
      });
  };

  const onChangeState = (value) => {
    if (value) {
      const allLGAsinAState = NaijaStates.lgas(`${value}`);
      setAllLgas(allLGAsinAState.lgas);
    }
  };

  const handlePhoneChange = (phone, country) => {
    const dialCode = country.dialCode;
    const localNumber = phone.replace(`+${dialCode}`, "");
    setCountryCode(dialCode);
    setPhoneNumber(localNumber);
  };

  useEffect(() => {
    if (firstNameInputRef.current) {
      const inputElement = firstNameInputRef.current.input;
      inputElement.focus();
      inputElement.setAttribute("autocomplete", "off");
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-1">
            Create a free Konnect Account!
          </h3>
          <p className="mb-4 text-gray-600">
            Fill in your details with your preferred email address that can be
            verified, thereafter check your email to claim your sign-up bonus!
          </p>
          {errorMessage && (
            <p className="text-red-600 mb-4">{errorMessage}</p>
          )}

          <Form
            form={form}
            onValuesChange={updateReferralCode}
            onFinish={signupUser}
            initialValues={{ home_address: "", state: "", lga: "" }}
            layout="vertical"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="first_name" label="First name">
                <Input
                  ref={firstNameInputRef}
                  autoComplete="new-name"
                  placeholder="First Name"
                  className="h-12"
                />
              </Form.Item>
              <Form.Item name="last_name" label="Last name (Surname)">
                <Input
                  autoComplete="new-family-name"
                  placeholder="Last Name"
                  className="h-12"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="email" label="Email Address">
                <Input
                  autoComplete="new-email"
                  type="email"
                  placeholder="Email Address"
                  className="h-12"
                />
              </Form.Item>
              <Form.Item name="phone_number" label="Phone Number">
                <PhoneInput
                  country={"ng"}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ height: "3rem", width: "100%" }}
                  inputProps={{ autoComplete: "tel" }}
                />
              </Form.Item>
            </div>

            <Form.Item name="password" label="Password">
              <Input.Password
                placeholder="Password"
                className="h-12"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item name="referralCode" label="Referral code">
              <Input
                placeholder="Referral code (if referred by a friend)"
                maxLength={6}
                className="h-12"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              {loadingReferralDetails && (
                <p className="text-sm text-gray-500">Checking code...</p>
              )}
              {referralDetails && (
                <span className="text-green-600 text-sm mt-1 block">
                  {referralDetails?.name}
                </span>
              )}
            </Form.Item>

            {isSo && (
              <>
                <Form.Item
                  name="home_address"
                  label="Vendor Address"
                  rules={[
                    {
                      required: isSo,
                      message: "Please input Vendor Address!",
                    },
                  ]}
                >
                  <Input
                    autoComplete="off"
                    placeholder="Vendor Address"
                    className="h-12"
                  />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="state"
                    label="State"
                    rules={[
                      { required: isSo, message: "Please input your state!" },
                    ]}
                  >
                    <Select
                      placeholder="Select State"
                      onChange={onChangeState}
                      className="h-12"
                    >
                      <Select.Option key={0} value="lagos">
                        Lagos
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="lga"
                    label="LGA"
                    rules={[
                      { required: isSo, message: "Please input your LGA!" },
                    ]}
                  >
                    <Select placeholder="Select LGA" className="h-12">
                      {all_lgas.map((lga, index) => (
                        <Select.Option key={index} value={lga.city_name}>
                          {lga.city_name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </>
            )}

            {/* <label className="flex items-center gap-2 my-4">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={isSo}
                onChange={() => setIsSo(!isSo)}
              />
              <b className="text-red-600">Become a RESTAURANT? Click here</b>
            </label> */}

            <p className="text-sm text-gray-600 mb-4">
              By clicking Create Account, you acknowledge you have read and
              agreed to our{" "}
              <Link
                to={`/terms?konnectrfc=${referralCode}&konnectrd=${redirectUrl}`}
                className="text-blue-600 underline"
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                to={`/privacy-policy/?konnectrfc=${referralCode}&konnectrd=${redirectUrl}`}
                className="text-blue-600 underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <Button
              htmlType="submit"
              className="w-full h-14 rounded bg-primary text-white font-semibold"
              loading={appLoading || loadingReferralDetails}
            >
              {appLoading || loadingReferralDetails
                ? "Please be patient, sign-up in progress"
                : "Create account"}
            </Button>
          </Form>

          <div className="mt-4">
            <Link
              to={`/signin/?konnectrfc=${referralCode}&konnectrd=${redirectUrl}`}
              className="text-sm text-gray-700"
            >
              Have an account? <span className="text-blue-600">Sign in here</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
