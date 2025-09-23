import { Button, Card, notification } from "antd";
import React, { useEffect, useState } from "react";
import empty_cart from "../../assets/images/restaurant/empty_cart.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  setRestaurant,
} from "../../slices/restaurantCartSlice";
import NumberFormat from "react-number-format";
import { _single_restaurant } from "../../common/axios_services";
import LeaveMessageDrawer from "./LeaveMessageDrawer";
import CartItem from "./CartItem";
import { CloseCircleOutlined } from "@ant-design/icons";
export const CheckoutSide = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [restaurantData, setRestaurantData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id: restaurantId } = useParams();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const restaurantCarts = useSelector((store) => store.restaurantCart.items);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      description: message,
    });
  };


  const fetchRestaurantInfo = async (id) => {
    setLoading(true);
    try {
      const response = await _single_restaurant({ id });
      const restaurant = response.data.data;
      setRestaurantData(restaurant);
      setLoading(false);
    } catch (err) {
      openNotificationWithIcon("Something went wrong", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantInfo(restaurantId);

      dispatch(setRestaurant({ restaurantId }));
    }
  }, [restaurantId, dispatch]);

  const handleGoBack = () => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const totalItems = restaurantCarts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = restaurantCarts.reduce((total, item) => {
    const price = item?.detail?.public_price || 0;
    const discount = item?.detail?.discount || 0;




    let itemTotal = price * (item.quantity || 0); 

    const extrasTotal = (item.extras || []).reduce((extraTotal, extra) => {
      const extraPrice = parseFloat(extra?.price) || 0; 
      const extraQuantity = extra?.quantity || 0; 
      return extraTotal + extraPrice * extraQuantity; 
    }, 0);

    itemTotal += extrasTotal;
    return total + itemTotal; 
  }, 0);


  const handleDelete = (productId) => {
    dispatch(changeQuantity({ productId, quantity: 0 })); 
  };


  const cartItems = useSelector((state) => state.restaurantCart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className={`flip-container mt-24 md:mt-0 ${isFlipped ? "flipped" : ""}`}
      >
        <div className="">

          <div className="">
            <div className="w-full lg:mt-24">
              <Card
                bordered={false}
                className="flex justify-center items-center py-14 bg-[#FDF4D7] rounded-[32px] border-2 border-black"
              >
                <div className="flex flex-col justify-center items-center gap-5">
                  <img src={empty_cart} alt="empty_cart" />
                  <p className="text-[#959595] text-lg">
                    {cartCount > 0
                      ? `You have ${cartCount} item(s) in your cart`
                      : "Your cart is empty"}
                  </p>
                  {cartCount > 0 && (
                    <button
                      onClick={handleFlip}
                      className="bg-transparent w-full rounded-xl border-2 border-black px-10 my-10 py-3"
                    >
                      Go to Checkout
                    </button>
                  )}
                </div>
              </Card>
            </div>
          </div>

          <div className="">
            <div className="w-full lg:mt-24">
              <Card
                bordered={false}
                className="flex-col items-center mb-24 py-0 bg-[#f5fff5] rounded-[32px] border-2 border-black"
              >
                <div className="divide-y-2">
                  <div className="rest_header flex justify-between">
                    <h2 className="text-xl text-black">Order Summary</h2>
                    <div
                      onClick={handleFlip}
                      className={" text-lg text-[red] cursor-pointer "}
                    >
                      Close <CloseCircleOutlined />
                    </div>
                  </div>
                  <div className="order_item">
                    <div className="flex items-center gap-4 py-3 my-3">
                      <img
                        src={restaurantData.display_image}
                        alt="restaurant_logo"
                        className="w-28 h-28 object-cover rounded-full"
                      />
                      <div>
                        <p className="text-xl text-black font-semibold">
                          {restaurantData.name + " - " + restaurantData.city}
                        </p>
                        <p className="text-base text-[#959595]">
                          {totalItems} Items •
                          <NumberFormat
                            value={totalAmount}
                            displayType={"text"}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={" ₦"}
                          />
                        </p>
                      </div>
                    </div>

                    <div>
                      {restaurantCarts.map((item, key) => (
                        <>
                          <CartItem
                            key={key}
                            data={item}
                            packIndex={key + 1}
                            onDelete={() => handleDelete(item.productId)}
                          />
                          {key !== restaurantCarts.length - 1 && (
                            <hr className={"my-5"} />
                          )}{" "}

                        </>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Button
                      type="default"
                      className="flex my-5 items-center justify-center px-6 py-10 w-full bg-[#FDF4D7] text-black rounded-2xl border border-black hover:bg-[#FDF4D7] focus:border-[#FDF4D7] focus:bg-[#FDF4D7] hover:text-black focus:text-black"
                      onClick={handleScrollToTop}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-base font-semibold text-black">
                          + Add another menu
                        </span>
                      </div>
                    </Button>
                  </div>
                  <LeaveMessageDrawer />
                  <div className="my-10">
                    <p className="text-sm text-center">
                      By proceeding, you agree to our{" "}
                      <span className="text-[#44843F]">Terms of use</span> and{" "}
                      <span className="text-[#44843F]">Privacy Policy</span>
                    </p>
                    <button
                      onClick={() => {
                        if (totalItems > 0) {
                          navigate(`/restaurant/${restaurantId}/checkout`);
                        }
                      }}
                      disabled={totalItems === 0 || totalAmount < 3500}
                      className={`flex justify-between w-full text-sm rounded-3xl border-2 border-black px-5 my-10 py-5 ${
                        totalItems === 0 || totalAmount < 3500
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#44843F] text-white"
                      }`}
                    >
                      <p>{totalItems === 0 ? "Can't Checkout" : "Checkout"}</p>
                      <p>
                        <NumberFormat
                          value={totalAmount}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          prefix={"₦"}
                        />
                      </p>
                    </button>
                    <p className={"text-base font-bold text-center"}>
                      Min Order of NGN 3,500 to checkout.
                    </p>
                  </div>
                </div>

              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
