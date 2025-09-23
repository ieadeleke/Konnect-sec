import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

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
            <div className="carousel-with-margi">
                <div className="">
                    <div className="">
                        <h3 className="">{param}</h3>
                    </div>
                    {categoryData.length ?
                        <>
                            <div className="">
                                <Slider {...settings}>
                                    {
                                        categoryData.map((category, index) => (
                                            <div className="" key={index}>
                                                <Link to={`/categories/${category.id}`}>
                                                    <div className="">
                                                        <div className="">
                                                            <div className={`category-image ${category.category_name}`}>
                                                                <img src={category.category_image} alt="product" />
                                                            </div>
                                                            <p className="caption">{category.category_name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </>
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
