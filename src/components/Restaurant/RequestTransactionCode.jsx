import { useEffect, useRef, useState } from "react";
import { Drawer, Input } from "antd";
import { useOtpInput } from "react-otp-input-hook";
import CancelIcon from "../../assets/images/icons/x.svg";

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { Link } from "react-router-dom";
const RequestTransactionCode = props => {

  const onChange = e => {
    props.handleOTPCode(e);
  }

  const otpBoxReference = useRef([]);

  const [inputData, setInputData] = useState("");
  const [inputCount] = useState(props.inputCount ? props.inputCount : 5);
  const [inputBoxCount] = useState(props.inputCount ? props.inputCount : 5);
  const [currIndex, setCurrIndex] = useState(0);

  const [otp, setOtp] = useState(new Array(inputBoxCount).fill(""));

  const { register } = useOtpInput({
    onInputValueChange: onChange,
  });

  const defaultOptions = { required: true };


  let inputBox = [];
  for (let i = 0; i < inputCount; i++) {
    inputBox.push(<input {...register(`digit-${i + 1}`, defaultOptions)} type="tel" />);
  }

  const onChangeInput = (input) => {
    if (input.length <= props.inputCount) {
      setInputData(input);
      props.stateFunc(input);
    }
  }

  const performUserAction = () => {
    props.closeDrawer();
    props.actionFunction();
    setInputData("");
  }

  useEffect(() => {
    if (inputData.length === 4) {
      performUserAction();
    }
  }, [inputData]);

  const handleOTPChange = (value) => {
    let newArr = [...otp];
    newArr[currIndex] = value;
    setOtp(newArr);
    if (value && currIndex < inputBoxCount - 1) {
      otpBoxReference.current[currIndex + 1].focus();
      setCurrIndex(currIndex + 1);
    } else if (value && currIndex === inputBoxCount - 1) {
      props.stateFunc(otp.join("") + value);
      props.actionFunction(otp.join("") + value);
      setCurrIndex(0);
      setOtp(new Array(inputBoxCount).fill(""));
    }
  }

  const onKeyPressInput = (button) => {
    if (button === "{bksp}") {
      let newArr = [...otp];
      newArr[currIndex] = "";
      setOtp(newArr);
      if (currIndex >= 1) {
        otpBoxReference.current[currIndex - 1].focus();
        setCurrIndex(currIndex - 1);
      } else {
        otpBoxReference.current[0].focus();
        setCurrIndex(0);
      }
    } else {
      handleOTPChange(button)
    }
  }

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < inputBoxCount - 1) {
      otpBoxReference.current[index + 1].focus()
    }
  }
  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus()
    }
    if (e.key === "Enter" && e.target.value && index < inputBoxCount - 1) {
      otpBoxReference.current[index + 1].focus()
    }
  }

  return (
    <div className="">
      <Drawer open={props.openDrawer} className="" onClose={props.closeDrawer} footer={null} title=""
        placement="right" closable={false} key="bottom">
        <div className="">

          {
            props.children
          }


          {
            !props.transChildrenPresent && (
              <div className="text-center">
                <h3>Enter Transaction PIN</h3>
              </div>
            )
          }



          <div className="mt-3">

            <div className="">
              {otp.map((digit, index) => (
                <Input.Password key={index}
                  value={digit} inputMode="none"
                  maxLength={1} type="tel" visibilityToggle={false}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                  style={{ height: "5rem" }}
                  ref={(reference) => (otpBoxReference.current[index] = reference)}
                  className={``}
                />
              ))}
            </div>

            <div className="mt-3">
              <div className="">
                <Link to={'/user/dashboard'}>Update transaction code (PIN)</Link>

              </div>
              <Keyboard

                layout={{
                  default: ["1 2 3", "4 5 6", "7 8 9", " 0 {bksp}"]
                }}
                theme="hg-theme-default hg-layout-numeric numeric-theme"
                onKeyPress={onKeyPressInput} inputPattern="tel"
              />
            </div>
          </div>

        </div>
      </Drawer>
    </div>
  );
};

export default RequestTransactionCode;