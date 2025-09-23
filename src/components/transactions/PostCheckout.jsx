import { LoadingOutlined } from '@ant-design/icons';
import { Spin, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { _get_profile, _verify_transactions } from '../../common/axios_services';
import { fetchData, profileData } from '../../slices/profileSlice';
import Footer from '../Footer';
import Navbar from '../Navbar';
const PostCheckout = () => {
    const params = new URLSearchParams(window?.location?.search);
    const reference = params.get('reference') || '';
    const msg = params.get('msg') || '';
    const title = params.get('title') || '';
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const newAntIcon = <LoadingOutlined style={{ fontSize: 24, color: '#008060' }} spin />;
    const openNotificationWithIcon = (type, message) => {
        notification[type]({ placement: 'bottomRight', description: message, });
    };

    const getProfile = async () => {
        try {
            const user_profile = await _get_profile()
            dispatch(profileData(user_profile.data.data))
            dispatch(fetchData(true))
        } catch (err) {
            dispatch(profileData(false))
            dispatch(fetchData(false))
            if (err.response) {
                navigate("/signin?redir=review")
                localStorage.removeItem('konnect_token')
                openNotificationWithIcon('error', err.response.data.message)
            } else {
                openNotificationWithIcon('error', 'Network Error')
            }
        }
    }

    useEffect(() => {
        getProfile()
    }, [reference])

    useEffect(() => {
        if (timeLeft > 0) {
            const countdown = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setIsTimeUp(true); 
        }
    }, [timeLeft]);

    return (
        <div className="">
            <Spin spinning={!msg} indicator={newAntIcon}>
                <div className="">
                    <Navbar />
                    <div className="">
                        <div className="">
                            <div className="aut">
                                <div>
                                    <h3>{title}</h3>
                                    <p>{msg}</p>
                                    <div style={{ marginBottom: '20px' }}></div>
                                    <div style={{ marginBottom: '20px' }}>
                                        {isTimeUp ? (
                                            <p>Time's up! You can now view your order details.</p>
                                        ) : (
                                            <p>Order details will be available in {timeLeft} seconds.</p>
                                        )}
                                    </div>
                                    <div className="">
                                        {isTimeUp ? (
                                            <Link to={`/review-order/${reference}`}>Order Details</Link>
                                        ) : (
                                            <span style={{ color: 'grey' }}>Order Details</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Navbar />
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className="aut">
                                    <div>
                                        <h3>{title}</h3>
                                        <p>{msg}</p>
                                        <div style={{ marginBottom: '20px' }}>
                                            {isTimeUp ? (
                                                <p>Time's up! You can now view your order details.</p>
                                            ) : (
                                                <p>Order details will be available in {timeLeft} seconds.</p>
                                            )}
                                        </div>
                                        <div className="">
                                            {isTimeUp ? (
                                                <Link to={`/review-order/${reference}`}>Order Details</Link>
                                            ) : (
                                                <span style={{ color: 'grey' }}>Order Details</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Spin>
        </div>
    )
}

export default PostCheckout