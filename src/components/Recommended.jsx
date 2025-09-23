import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import Card from './Card';
const Recommended = (props) => {
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
    let data = props.products
    let products = data.slice(0, 12).map(product => product)

    return (
        <div className="">
            <div className="quick-list no-margin products shop_space_top">
                <div className="">
                    <div className="top">
                        <div className="">
                            <h3 className="">{props.param}</h3>
                        </div>
                        {products.length ?
                            <Row gutter={[16, 16]}>
                                {products.map((product, index) => (
                                    <Col className="gutter-row" xs={12} sm={6} md={6} lg={6} xl={6} key={index} >
                                        <Card product={product} />
                                    </Col>
                                ))}
                            </Row>
                            :
                            <Row gutter={[16, 16]}>
                                {skeleton.map((placeHolder, index) => (
                                    <Col className="gutter-row" xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                                        {placeHolder}
                                    </Col>
                                ))}
                            </Row>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Recommended