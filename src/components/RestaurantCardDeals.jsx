import { Card, Col, Row } from 'antd';
import React from 'react';
import sideimage_1 from '../assets/images/homepage/restaurant_side_image1.png';
export const RestaurantCardDeals = () => {
  return (
        <div className='restaurant_banner3 restaurant_card'>
            <div className="hidden md:flex">

                <Row gutter={[32, 32]} style={{ width: "100%", display: 'flex', alignItems: 'stretch' }}>
                    <Col xs={24} sm={12} md={12} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ border: "2px solid black", borderRadius: "32px", backgroundColor: '#FDF4D7', display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', height: '100%', margin: "auto" }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', padding: '15px' }}>
                                    <img src={sideimage_1} alt="side image" style={{ width: '100%', borderRadius: '16px 0 0 16px', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 2, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h1 style={{ fontSize: '2.5rem' }}>Delivery in no time!</h1>

                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} style={{ display: 'flex' }}>
                        <Card bordered={false} style={{ border: "2px solid black", borderRadius: "32px", backgroundColor: '#D3ECDC', display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', padding: '15px' }}>
                                    <img src={sideimage_1} alt="side image" style={{ width: '100%', borderRadius: '16px 0 0 16px', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 2, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h1 style={{ fontSize: '2.5rem' }}>Refer friends and earn cash monthly</h1>

                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </div>

            <div className="overflow-x-scroll md:hidden flex space-x-4">
                <Card className='w-[90%] flex-shrink-0' bordered={false} style={{ border: "2px solid black", borderRadius: "32px", backgroundColor: '#FDF4D7', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', height: '100%', margin: "auto" }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', padding: '15px' }}>
                            <img src={sideimage_1} alt="side image" style={{ width: '100%', borderRadius: '16px 0 0 16px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 2, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h1 style={{ fontSize: '2.5rem' }}>Delivery in no time!</h1>

                        </div>
                    </div>
                </Card>
                <Card className='w-[90%] flex-shrink-0' bordered={false} style={{ border: "2px solid black", borderRadius: "32px", backgroundColor: '#D3ECDC', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', padding: '15px' }}>
                            <img src={sideimage_1} alt="side image" style={{ width: '100%', borderRadius: '16px 0 0 16px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 2, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h1 style={{ fontSize: '2.5rem' }}>Refer friends and earn cash monthly</h1>

                        </div>
                    </div>
                </Card>

            </div>
        </div>
  )
}
