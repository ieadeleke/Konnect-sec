import { Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import airtime from '../assets/images/homepage/airtime.png';
import foodBox from '../assets/images/homepage/food-box-wooden.png';
import SliderComponent from './home/banner_slider';
import HomeSlider from './home/slider';
const HomeCard = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className='py-8 mb-5 max-sm:hidden '>
            <Row justify={'center'}>
                <Col xl={12}>
                    <div className="lg:mr-5 mb-5">
                        <div className='grid_flex slider_content'>
                            <div>
                                <h1 style={{ color: "black" }}>Shop for groceries, foodstuffs & pay at delivery.</h1>
                                <div style={{ marginTop: '30px' }}>
                                    <button onClick={() => navigate('/shop')} className='rounded-button'>Go to shop</button>
                                </div>
                            </div>
                            <div className='home_side_image'>
                                <img className='rice' src={foodBox} alt="food box" />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                <div className="mb-5">
                    <div className='grid_flex slider_content'>
                        <div>
                            <h1>Recharge your airtime and get 8% cash bonus.</h1>
                            <div style={{ marginTop: '30px' }}>
                                <button onClick={() => navigate('/profile/loyalty')} className='rounded-button'>My wallet</button>
                            </div>
                        </div>
                        <div className='home_side_image'>
                            <img className='rice' src={airtime} alt="Airtime" />
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
        <div className="lg:hidden py-4 my-2">
            <HomeSlider />
        </div>
    </>
    
  )
}

export default HomeCard