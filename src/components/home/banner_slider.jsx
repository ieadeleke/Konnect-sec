import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/css/home.css';
import slider2Img1 from '../../assets/images/homepage/slider2Img1.png';
import slider2Img2 from '../../assets/images/homepage/slider2Img2.png';
import slider2Img3 from '../../assets/images/homepage/slider2Img3.png';
import slider2Img4 from '../../assets/images/homepage/slider2Img4.png';
import slider2Img5 from '../../assets/images/homepage/slider2Img5.png';
import slider2Img6 from '../../assets/images/homepage/slider2Img6.png';
const SliderComponent = () => {

    const items = [
        {id: 1, imgSize: '384px', bgColor: '', imageUrl: slider2Img1},
        {id: 2, imgSize: '200px', bgColor: '#FDECDD', imageUrl: slider2Img2},
        {id: 3, imgSize: '350px', bgColor: '', imageUrl: slider2Img3},
        {id: 4, imgSize: '200px', bgColor: '#FFF4F4', imageUrl: slider2Img4},
        {id: 5, imgSize: '394px', bgColor: '#B5825A', imageUrl: slider2Img5},
        {id: 6, imgSize: '200px ', bgColor: '', imageUrl: slider2Img6},
        {id: 7, imgSize: '250px', bgColor: '#FDECDD', imageUrl: slider2Img2},
    ];

    const optionsFirstCarousel = {
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1000, settings: { slidesToShow: 5 } },
            { breakpoint: 600, settings: { slidesToShow: 3 } },
            { breakpoint: 0, settings: { slidesToShow: 1 } },
        ],
    };


    return (
        <div style={{padding: '20px'}}>

            <Slider {...optionsFirstCarousel}>
                {items.map((item) => (
                    <>
                        <div
                            className=""
                            key={item.id}
                            style={{
                                backgroundColor: item.bgColor,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: item.imgSize,
                                height: '250px', 
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                alt={`Slide ${item.id}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    </>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
