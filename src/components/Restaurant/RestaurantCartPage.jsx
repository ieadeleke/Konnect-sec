import { useEffect, useState } from "react";
import { Button, Card, Col, notification, Row, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  setRestaurant,
} from "../../slices/restaurantCartSlice";
import { _single_restaurant } from "../../common/axios_services";
import { LoadingOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";
import LeaveMessageDrawer from "./LeaveMessageDrawer";
import BackToRestaurant from "./BackToRestaurant";
import CartItem from "./CartItem";

const RestaurantCartPage = () => {
  const [restaurantData, setRestaurantData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: restaurantId } = useParams();

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

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleGoBack = () => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    if (restaurantCarts.length === 0 && !loading) {
      handleGoBack(); 
    }
  }, [restaurantCarts, loading, navigate, restaurantId]);

  return (
    <>
      <Spin spinning={loading} indicator={antIcon}>
        {restaurantData.name && restaurantCarts.length > 0 ? (
          <Row justify={"center"} className={"my-2"}>
            <Col xs={22} className={"mb-24"}>
              <BackToRestaurant restaurantId={restaurantId} />
              <Card
                bordered={false}
                className="flex-col px-5 items-center mb-24 py-8 bg-[#f5fff5] rounded-[32px] border-2 border-black"
              >
                <div className="divide-y-2">
                  <div className="rest_header my-3">
                    <h2 className="text-3xl text-black">Order Summary</h2>
                  </div>
                  <div className="order_item">
                    <div className="flex items-center gap-4 py-3 my-3">
                      <img
                        src={restaurantData.display_image}
                        alt="restaurant_logo"
                        className="w-28 h-28 object-cover rounded-full"
                      />
                      <div>
                        <p className="text-2xl text-black font-semibold">
                          {restaurantData.name + " - " + restaurantData.city}
                        </p>
                        <p className="text-xl text-[#959595]">
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

                    <div className={"py-5"}>
                      {restaurantCarts.map((item, key) => (
                        <CartItem
                          key={key}
                          data={item}
                          packIndex={key + 1}
                          onDelete={() => handleDelete(item.productId)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Button
                      type="default"
                      className="flex my-5 items-center justify-center px-6 py-10 w-full bg-[#FDF4D7] text-black rounded-2xl border border-black hover:bg-yellow-200 focus:border-yellow-200 focus:bg-yellow-200"
                      onClick={handleGoBack}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-semibold">
                          + Add another menu
                        </span>
                      </div>
                    </Button>
                  </div>
                  <LeaveMessageDrawer />
                  <div className="my-10">
                    <p className="text-lg text-center">
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
                      className={`flex justify-between w-full rounded-3xl border-2 border-black px-10 my-10 py-3 ${
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
                    <p className={"text-xl font-bold text-center"}>
                      Min Order of NGN 3,500 to checkout.
                    </p>
                  </div>
                </div>

              </Card>
            </Col>
          </Row>
        ) : (
          <div className="flex items-center justify-center h-screen">

            <p>Loading Order Summary...</p>

          </div>
        )}
      </Spin>
    </>
  );
};

export default RestaurantCartPage;
