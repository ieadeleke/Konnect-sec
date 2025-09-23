import { Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";
import airtime from "../assets/images/homepage/airtime.png";
import foodBox from "../assets/images/homepage/food-box-wooden.png";

const DealsCard = () => {
    const navigate = useNavigate();
  return (
    <>

      <div className='hidden md:flex' >
            <Row
            align={"middle"}
            justify={"center"}
            className="h-auto w-full px-12 my-36"
            gutter={16}
            >
                <Col xs={12}>
                    <div className="w-full flex justify-center items-center max-md:mt-5 mt-3  max-md:justify-center">
                        <div className="slide_1 w-full">
                            <div className="grid_flex slider_content">
                                <div>
                                    <h1 className="text-6xl text-[60px]" style={{ color: "black" }}>
                                    Shop for groceries, foodstuffs & pay at delivery.
                                    </h1>
                                    <div className="mt-8">
                                    <button
                                        onClick={() => navigate("/shop")}
                                        className="rounded-button focus:outline-none "
                                    >
                                        Go to shop
                                    </button>
                                    </div>
                                </div>

                                <div className="home_side_image">
                                    <img className="rice" src={foodBox} alt="food box" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12}>
                    <div className="w-full flex justify-center items-center max-md:mt-5 mt-3  max-md:justify-center">
                        <div className="slide_2 w-full">
                            <div className="grid_flex slider_content">
                                <div className="w-full h-full">
                                    <h1 className="text-6xl text-[60px]">
                                    Recharge your airtime and get 8% cash bonus.
                                    </h1>
                                    <div className="mt-8">
                                    <button
                                        onClick={() => navigate("/profile/loyalty")}
                                        className="rounded-button focus:outline-none "
                                    >
                                        My wallet
                                    </button>
                                    </div>
                                </div>
                                <div className="home_side_image">
                                    <img className="rice" src={airtime} alt="Airtime" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            {/*  */}
        </div>


        {/* MOBILE SCREEN */}
        <div className="max-md:overflow-x-auto md:hidden max-md:flex max-md:space-x-4 max-md:px-4 my-36">
            <div className="slide_1 w-full flex-shrink-0">
                <div className="grid_flex slider_content">
                    <div>
                        <h1 className="text-6xl text-[60px]" style={{ color: "black" }}>
                            Shop for groceries, foodstuffs & pay at delivery.
                        </h1>
                        <div className="mt-8">
                            <button
                                onClick={() => navigate("/shop")}
                                className="rounded-button focus:outline-none"
                            >
                                Go to shop
                            </button>
                        </div>
                    </div>
                    <div className="home_side_image">
                        <img className="rice" src={foodBox} alt="food box" />
                    </div>
                </div>
            </div>
            <div className="slide_2 w-full flex-shrink-0">
                <div className="grid_flex slider_content">
                    <div>
                        <h1 className="text-6xl text-[60px]">
                            Recharge your airtime and get 8% cash bonus.
                        </h1>
                        <div className="mt-8">
                            <button
                                onClick={() => navigate("/profile/loyalty")}
                                className="rounded-button focus:outline-none"
                            >
                                My wallet
                            </button>
                        </div>
                    </div>
                    <div className="home_side_image">
                        <img className="rice" src={airtime} alt="Airtime" />
                    </div>
                </div>
            </div>
        </div>

    </>
 
    )
}

export default DealsCard
