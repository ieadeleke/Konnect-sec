import { Col, Row, Badge } from "antd";
import React, { useState, useEffect } from "react";
import { CloseCircleOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import location_pin from "../assets/images/location_red.svg";
import { setRestaurant } from "../slices/restaurantCartSlice";


export const LocationWrapper = ({ selectedLGA, handleLGAChange, lagosLga, selectLoc }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { id: restaurantId } = useParams();
  const dispatch = useDispatch();


  const cartItems = useSelector((state) => state.restaurantCart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);



  useEffect(() => {
    if (restaurantId) {
      dispatch(setRestaurant({ restaurantId }));
    }
  }, [dispatch, restaurantId]);

  const handleLocationWrapperSearch = () => {
    setIsClicked(!isClicked);
  };

  const handleCartClick = () => {
    if (restaurantId) {
      navigate(`/restaurant/${restaurantId}/restaurant_cart`);
    }
  };


  return (
    <div className={`wrapperBg ${!selectLoc ? 'h-[70px] md:h-[150px]' : ''} `}>
      <Row justify={'middle'} className='h-[100%]'>
        <Col xs={24}>
          <div className="items-center hidden md:flex flex-wrap gap-2 justify-around px-10">
            {selectLoc ? (
              <>
                <div className="flex gap-2 items-center">
                  <span>
                    <img className="" src={location_pin} alt="" />
                  </span>
                  <select
                    className="bg-transparent border-none border-0 outline-0 focus:border-none focus:outline-0 text-xl"
                    value={selectedLGA}
                    onChange={(e) => handleLGAChange(e.target.value)}
                  >
                    <option value="">Select Location</option>
                    {lagosLga.map((lga) => (
                      <option key={lga.id} value={lga.city_name}>
                        {lga.city_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-[#959595] text-lg">
                    {selectedLGA + ", Lagos State" || "Lagos State"}
                  </p>
                </div>
              </>
            ) : (
              <img src={logo} className={"w-[12%] "} alt="" />
            )}
            <div className="flex justify-between border-2 border-[#00000073] w-1/2 rounded-full py-4 px-5 bg-transparent">
              <input type="text" className='w-full bg-transparent focus:outline-none text-lg' placeholder='Search restaurants' />
              <SearchOutlined style={{ fontSize: '18px' }} />
            </div>
            {
              !selectLoc && (
                <Badge
                  count={cartCount}
                  offset={[0, 5]} size="small">
                  <ShoppingCartOutlined
                    style={{
                      fontSize: "28px",
                      cursor: "pointer",
                      color: "#000",
                    }}
                    onClick={handleCartClick} 
                  />
                </Badge>
              )
            }
          </div>

          <div className="items-center md:hidden gap-2 justify-around px-10">
            <div className={` ${selectLoc ? 'justify-between' : 'justify-end gap-8'} flex  items-center`}>
              <div className={` ${isClicked ? 'hidden' : 'flex'} flex-col `}>
                {selectLoc ? (
                  <>
                    <div className="flex gap-3">
                      <span>
                        <img className="" src={location_pin} alt="" />
                      </span>
                      <select
                        className="bg-transparent border-none border-0 outline-0 focus:border-none focus:outline-0 text-lg"
                        value={selectedLGA}
                        onChange={(e) => handleLGAChange(e.target.value)}
                      >
                        <option value="">Select Location</option>
                        {lagosLga.map((lga) => (
                          <option key={lga.id} value={lga.city_name}>
                            {lga.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-2">
                      <p className="text-[#959595] text-sm">
                        {selectedLGA + ", Lagos State" || "Lagos State"}
                      </p>
                    </div>
                  </>
                ) : (
                  <p></p>
                )}
              </div>

              <div className={` ${isClicked ? 'flex justify-between border-2 border-[#00000073] w-full rounded-full  py-4 px-5 bg-transparent' : ''} `}>
                <input type="text" className={` ${isClicked ? 'block' : 'hidden'}   w-full bg-transparent focus:outline-none text-3xl`} placeholder='Search restaurants' />
                {
                  isClicked ? <CloseCircleOutlined style={{ fontSize: '22px' }} onClick={handleLocationWrapperSearch} /> :
                    <SearchOutlined style={{ fontSize: '22px' }} onClick={handleLocationWrapperSearch} />
                }
              </div>
              {
                !selectLoc && (
                  <Badge
                    count={cartCount}
                    offset={[0, 5]} size="small">
                    <ShoppingCartOutlined
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "#000",
                      }}
                      onClick={handleCartClick} 
                    />
                  </Badge>
                )
              }
            </div>
          </div>
        </Col>
      </Row>

    </div>
  )
}
