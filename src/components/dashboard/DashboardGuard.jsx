import { Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _get_profile } from "../../common/axios_services";
import CompleteKyc from "../../pages/Complete_Kyc";
import Dashboard from "../../pages/Dashboard";
import Loyalty from "../../pages/Loyalty";
import ProfileBills from "../../pages/ProfileBills";
import Referral from "../../pages/Referral";
import Sa from "../../pages/SL/sa";
import SalesOrder from "../../pages/SL/sales_order";
import Sl from "../../pages/SL/sl";
import Wishlist from "../../pages/Wishlist";
import Checkout from "../../pages/checkout";
import OrderHistory from "../../pages/order-history";
import Review from "../../pages/review-order";
import SoOrder from "../../pages/sa_so_order";
import { fetchData, profileData } from "../../slices/profileSlice";
import RestaurantDashboard from "../../pages/restaurant-dashboard/Dashboard";
import RestaurantProfile from "../../pages/restaurant-dashboard/Profile";
import RestaurantMenu from "../../pages/restaurant-dashboard/Menu";
import RestaurantDelivery from "../../pages/restaurant-dashboard/MyDelivery";
const DashboardGuard = ({ location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [component, setComponent] = useState("");
  const jwt = localStorage.konnect_token;


  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: "",
      placement: "bottomRight",
      description: message,
    });
  };


  const componentMap = {
    bills: <ProfileBills />,
    dashboard: <Dashboard />,
    referral: <Referral />,
    complete_kyc: <CompleteKyc />,
    sl: <Sl />,
    sa: <Sa />,
    loyalty: <Loyalty />,
    order_history: <OrderHistory />,
    sa_so: <SoOrder />,
    sales_review: <SalesOrder />,
    paybill: <OrderHistory />,
    checkout: <Checkout />,
    review: <Review />,
    wishlist: <Wishlist />,
    restaurant_dash: <RestaurantDashboard />,
    restaurant_profile: <RestaurantProfile />,
    restaurant_menu: <RestaurantMenu />,
    restaurant_delivery: <RestaurantDelivery />,
  };

  useEffect(() => {
    if (!jwt) {

      navigate("/signin");
      openNotificationWithIcon("error", "Unauthorized");
      return setComponent(
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      );
    }

    const guard = async () => {
      console.log("calling guard");
      setComponent(
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      );
      try {
        const user_profile = await _get_profile();
        if (
          user_profile?.data?.data?.kyc_status !== "verified" &&
          location !== "complete_kyc" &&
          location !== "checkout" &&
          location !== "review" &&
          location !== "order_history" &&
          location !== "dashboard" &&
          location !== "wishlist"
        ) {

          navigate(`/profile/complete-kyc`);
        } else {
          const component = componentMap[location];
          if (component) {
            setComponent(component);
          } else {
            navigate(`/signin?redir=${location}`);
          }
        }
        dispatch(fetchData(true));
        dispatch(profileData(user_profile.data.data));
      } catch (err) {

        if (err.response) {
          if (err.response.data.message === "Unauthorized") {
            localStorage.removeItem("konnect_token");
            navigate(`/signin?redir=${location}`);
          }
          dispatch(profileData(false));
          dispatch(fetchData(false));
          openNotificationWithIcon("error", err.response.data.message);
        } else {

        }
      }
    };
    guard();
  }, [dispatch, jwt, location]);

  return <>{component}</>;
};

export default DashboardGuard;
