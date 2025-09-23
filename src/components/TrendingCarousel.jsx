import '../assets/css/shop.css';
import Banner1 from '../assets/images/shop/strip_banner1.png';
import Banner3 from '../assets/images/shop/strip_banner2.png';
import { Carousel, Col, Row } from 'antd';
const TrendingCarousel = () => {
    return (
        <Row>
            <Col span={24}>
                <Carousel autoplay dots={true} pauseOnHover={true} pauseOnDotsHover={true} draggable={true} className="">
                    <div className="">
                        <img src={Banner1} alt="shop banner" />
                    </div>
                    <div className="">
                        <img src={Banner3} alt="shop banner" />
                    </div>
                </Carousel>
            </Col>
        </Row>
    )
}

export default TrendingCarousel