import { Divider } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { _get_profile } from "../../common/axios_services";
import { fetchData, profileData } from "../../slices/profileSlice";
import { logoutUser } from "../../slices/authSlice";

const RestaurantSideNav = () => {
  const userData = useSelector((state) => state.userProfile.dataFetched);
  const isLoggingOut = useSelector((state) => state.auth.isLoggingOut);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const isVendor = userData?.is_so;
  const isRestaurant = userData?.is_restaurant;

  useEffect(() => {

    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogout = async () => {
    if (isLoggingOut) {
      console.log("Logout already in progress");
      return;
    }

    try {
      const result = await dispatch(logoutUser()).unwrap();
      console.log("Logout completed:", result.message);

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const user_profile = await _get_profile();
      dispatch(fetchData(true));
      dispatch(profileData(user_profile?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <>
        <ul>
          <h4 style={{ padding: 0 }} className="profile_nav_title">
            <ion-icon class="" name="storefront-outline"></ion-icon>{" "}
            My Resturant(s)
          </h4>
        </ul>
        <Divider style={{ margin: "10px 0px" }} />
        <ul>
          <li>
            <NavLink
              to="/restaurant/dashboard"
              style={({ isActive }) => ({
                color: !isActive ? "#111111" : "#258635",
              })}
            >
              <ion-icon class="" name="wallet-outline"></ion-icon>{" "}
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/restaurant/menu"
              style={({ isActive }) => ({
                color: !isActive ? "#111111" : "#258635",
              })}
            >
              <ion-icon class="" name="people-outline"></ion-icon>{" "}
              My Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/restaurant/profile"
              style={({ isActive }) => ({
                color: !isActive ? "#111111" : "#258635",
              })}
            >
              <ion-icon class="" name="card-outline"></ion-icon> My
              Profile
            </NavLink>
          </li>
        </ul>
        <div>
          <Divider style={{ margin: "10px 0px" }} />
          <ul>
            <li>
              <NavLink
                to="/contact"
                style={({ isActive }) => ({
                  color: !isActive ? "#111111" : "#258635",
                })}
              >
                <ion-icon class="" name="person-outline"></ion-icon>{" "}
                Support
              </NavLink>
            </li>
            <li className="">
              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  color: "red",
                  fontSize: "14px",
                  background: "transparent",
                  outline: "none",
                }}
              >
                <ion-icon
                  class=""
                  name="log-out-outline"
                ></ion-icon>{" "}
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </>
    </div>
  );
};

export default RestaurantSideNav;
