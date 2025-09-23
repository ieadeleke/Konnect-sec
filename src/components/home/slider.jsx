import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import airtime from '../../assets/images/homepage/airtime.png';
import foodBox from '../../assets/images/homepage/food-box-wooden.png';
import { useNavigate } from 'react-router-dom';
const HomeSlider = () => {
    const navigate = useNavigate()
    const sliderSettings = {
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1000, settings: { slidesToShow: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
            { breakpoint: 0, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div style={{ marginTop: "5rem" }}>
            <div className="">
                <Slider {...sliderSettings}>
                    <div className="">
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
                    <div className="">
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
                </Slider>
            </div>
        </div>
    )
}

export default HomeSlider
