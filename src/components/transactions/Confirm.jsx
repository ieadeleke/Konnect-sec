import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Spin, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { _get_profile, _verify_transactions } from '../../common/axios_services';
import { fetchData, profileData } from '../../slices/profileSlice';
import Footer from '../Footer';
import Navbar from '../Navbar';
const Confirm = () => {
  const params = new URLSearchParams(window?.location?.search);
  const [reference,] = useState(params.get('reference') ? params.get('reference') : '');
  const [modal1Open, setModal1Open] = useState(false)
  const [err_status, setErr_status] = useState(true)
  const [msg, setMsg] = useState(false)
  const [title, setTitle] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [transRef, setTransRef] = useState("");
  const [services, setServices] = useState("");
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

  const verifyPaymant = async () => {
    setModal1Open(true)
    try {
      const verified = await _verify_transactions({ reference })
      setMsg(verified?.data?.message)
      setTransRef(verified.data.data.transaction_ref)
      setServices(verified.data.data.service)
      setErr_status(false)
      setTitle(verified?.data?.title)
    } catch (err) {
      setErr_status(true)
      if (err.response) {
        setMsg(err.response.data.message)
      } else {
        setMsg(err.message)
      }
    }
  }

  useEffect(() => {
    verifyPaymant()
    getProfile()
  }, [reference])

  return (
    <div className="">
      <Spin spinning={!msg} indicator={newAntIcon}>
        <div className="">
          <Navbar />
          <div className="">
            <div className="">
              <div className="aut">
                {modal1Open && msg && (
                  <>
                    {err_status ?
                      <div>
                        <p>{msg}</p>
                        <div style={{ marginBottom: '20px' }}></div>
                        <div className="">
                          <Link to='/profile/order_history'>
                            Proceed To Dashboard
                          </Link>
                        </div>
                      </div>
                      :
                      <div>
                        <h3>{title}</h3>
                        <p>{msg}</p>
                        <div style={{ marginBottom: '20px' }}></div>
                        <div className="">
                          {services === "shop" ?
                            <Link to={`/review-order/${transRef}`}>
                              Order Details
                            </Link>
                            :
                            <Link to={"/profile/loyalty"}>
                              See Transaction History
                            </Link>
                          }
                        </div>
                      </div>
                    }
                  </>
                )}
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
                  {modal1Open && msg && (
                    <>
                      {err_status ?
                        <div>
                          <p>{msg}</p>
                          <div style={{ marginBottom: '20px' }}></div>
                          <div className="">
                            <Link to='/profile/order_history'>
                              Proceed To Dashboard
                            </Link>
                          </div>
                        </div>
                        :
                        <div>
                          <h3>{title}</h3>
                          <p>{msg}</p>
                          <div style={{ marginBottom: '20px' }}></div>
                          <div className="">
                            {services === "shop" ?
                              <Link to={`/review-order/${transRef}`}>
                                Order Details
                              </Link>
                              :
                              <Link to={"/profile/loyalty"}>
                                See Transaction History
                              </Link>
                            }
                          </div>
                        </div>
                      }
                    </>
                  )}
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

export default Confirm

