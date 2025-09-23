import { Divider } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../slices/profileSlice";
import { logoutUser } from "../../slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    dataFetched: profileInfo,
    loading,
    fetch,
  } = useSelector((state) => state.userProfile);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoggingOut = useSelector((state) => state.auth.isLoggingOut);

  useEffect(() => {

    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }


    if (!profileInfo && !loading) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, profileInfo, loading, dispatch, navigate]);

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



  if (!isAuthenticated) {
    return (
      <div style={{ height: "100%" }}>

      </div>
    );
  }

  return (
    <div style={{ height: "100%" }}>
      <ul>
        <h4 style={{ padding: 0 }} className="profile_nav_title">
          <ion-icon class="" name="storefront-outline"></ion-icon>{" "}
          My Dashboard
        </h4>
      </ul>
      <Divider style={{ margin: "10px 0px" }} />
      <ul>
        {profileInfo?.is_restaurant === true && (
          <li>
            <NavLink
              to="/restaurant/dashboard"
              style={({ isActive }) => ({
                color: !isActive ? "#111111" : "#258635",
              })}
            >
              <ion-icon class="" name="card-outline"></ion-icon>My
              Restaurant
            </NavLink>
          </li>
        )}
        {profileInfo?.kyc_status === "verified" && (
          <li>
            <NavLink
              to="/profile/loyalty"
              style={({ isActive }) => ({
                color: !isActive ? "#111111" : "#258635",
              })}
            >
              <ion-icon class="" name="wallet-outline"></ion-icon>{" "}
              Wallet
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/profile/order_history"
            style={({ isActive }) => ({
              color: !isActive ? "#111111" : "#258635",
            })}
          >
            <ion-icon class="" name="card-outline"></ion-icon> My
            Order
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/wishlist"
            style={({ isActive }) => ({
              color: !isActive ? "#111111" : "#258635",
            })}
          >
            <ion-icon class="" name="pricetag-outline"></ion-icon>{" "}
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/overview"
            style={({ isActive }) => ({
              color: !isActive ? "#111111" : "#258635",
            })}
          >
            <ion-icon class="" name="settings-outline"></ion-icon>{" "}
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
              <ion-icon class="" name="log-out-outline"></ion-icon>{" "}
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
