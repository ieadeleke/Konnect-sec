import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Apple from '../../assets/images/apple_store.png';
import play from '../../assets/images/play_store.png';
import rice from '../../assets/images/homepage/rice_plate.png';
const RestaurantSlider = () => {
    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    }
    return (
        <div>
            <Slider {...settings}>
                <div className="">
                    <div className='grid_flex slider_content'>
                        <div>
                            <h1>Restaurants</h1>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className='grid_flex slider_content'>
                        <div>
                            <h1>Sign Up, Download App & ₦1k cash to buy food</h1>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: '50px' }}>
                                <a target="_blank" href="https://apps.apple.com/app/konnect-ws/id6504823567">
                                    <img style={{ height: "5rem", width: "auto" }} src={Apple} className="" alt="download on apple store" />
                                </a>
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.wnapp.id1695026422582">
                                    <img style={{ height: "5rem", width: "auto" }} src={play} className="" alt="download on google play store" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <img className='rice' src={rice} alt="plate of rice" />
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default RestaurantSlider
