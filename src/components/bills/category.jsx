import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Skeleton } from 'antd';
const Category = ({ param, categoryData }) => {
    const settings = {
        arrows: true,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1000, settings: { slidesToShow: 6 } },
            { breakpoint: 600, settings: { slidesToShow: 3 } },
            { breakpoint: 0, settings: { slidesToShow: 3 } },
        ],
    }
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
    return (
        <div>
            <div className="px-4 my-4">
                <div className="">
                    <div className="">
                        <h3 className="">{param}</h3>
                    </div>
                    {categoryData.length ?
                        <Slider {...settings}>
                        </Slider>
                        :
                        <div className="">
                            {skeleton.map((placeHolder, index) => (
                                <div className="" key={index}>
                                    {placeHolder}
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div >
        </div >
    )
}

export default Category
