import React from "react";
import Slider from "react-slick";
import NumberFormat from "react-number-format";
import {
  InvoiceIcon,
  MessageIcon,
  PendingOrder,
  VolumeUpIcon,
} from "../../../common/utils/Icons";

const InfoSlider = ({ orderMetrics }) => {
  const [currency] = React.useState("NGN");

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          focusOnSelect: true,
        },
      },
    ],
  };

  return (
    <div className="pb-0">
      <div className="profile_container">
        <div className="">
          <Slider {...settings}>
            <div
              key={1}
              className=""
            >
              <div className="slick-div">
                <div className="slick-box">
                  <div className="">
                    <img src={PendingOrder} alt="Sales Balance" />
                  </div>
                  <div className="">
                    <p>Sales Balance {currency}</p>
                    <h2>
                      <span style={{ marginRight: "3px" }} className="">
                        ₦
                      </span>
                      <NumberFormat
                        thousandSeparator={true}
                        displayType={"text"}
                        value={orderMetrics.sales_balance ?? 0}
                      />

                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              key={2}
              className=""
            >
              <div className="slick-div">
                <div className="slick-box">
                  <div className="">
                    <img src={InvoiceIcon} alt="Invoice Icon" />
                  </div>
                  <div className="">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>Today</p>
                    </div>
                    <h2>
                      <NumberFormat
                        thousandSeparator={true}
                        displayType={"text"}
                        value={orderMetrics.todayOrdersCount}
                      />
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              key={3}
              className=""
            >
              <div className="slick-div">
                <div className="slick-box">
                  <div className="">
                    <img src={VolumeUpIcon} alt="Volume Icon" />
                  </div>
                  <div className="">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>Today {currency}</p>
                    </div>
                    <h2>
                      <span style={{ marginRight: "3px" }} className="">
                        ₦
                      </span>
                      <NumberFormat
                        thousandSeparator={true}
                        displayType={"text"}
                        value={orderMetrics.todayNgn}
                      />
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              key={4}
              className=""
            >
              <div className="slick-div">
                <div className="slick-box">
                  <div className="">
                    <img src={MessageIcon} alt="Volume Icon" />
                  </div>
                  <div className="">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>Sales till date {currency}</p>
                    </div>
                    <h2>
                      <span style={{ marginRight: "3px" }} className="">
                        ₦
                      </span>
                      <NumberFormat
                        thousandSeparator={true}
                        displayType={"text"}
                        value={orderMetrics.salesTillDateNgn}
                      />
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default InfoSlider;
