import { Drawer, notification, Modal, Badge } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import bellIconUrl from "../assets/images/icons/bell.svg";
import cartIconUrl from "../assets/images/icons/cart.svg";
import mobileMenuIconUrl from "../assets/images/icons/mobilemenu.svg";
import cancelIconUrl from "../assets/images/icons/x.svg";
import Logo from "../assets/images/logo.png";
import mobileNotificationIconUrl from "../assets/images/icons/mobilenotification.svg";

import { addToCart } from "../slices/cartSlice";
import { _get_user_notification } from "../common/axios_services";
import { fetchUserProfile } from "../slices/profileSlice";
import { logoutUser } from "../slices/authSlice";
import AppRoutes from "./routes";
import MobileDownloadStores from "./MobileDownloadStores";

const Navbar = ({ noShadow, adjustNavSize, showCart, restaurantCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useSelector((state) => state.userCart.cart);
  const { dataFetched: userData, loading: profileLoading } = useSelector(
    (state) => state.userProfile
  );
  const { isAuthenticated, loading: authLoading, isLoggingOut } = useSelector(
    (state) => state.auth
  );

  const [open, setOpen] = useState(false);
  const [,setOpenNotificationModal] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [showCashbackModal, setShowCashbackModal] = useState(false);

  const onClose = () => setOpen(false);

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title || "",
      placement: "bottomRight",
      description: message || "",
    });
  };

  const handleLogout = async () => {
    setOpen(false);
    setOpenNotificationModal(false);

    if (isLoggingOut) return;

    try {
      await dispatch(logoutUser()).unwrap();
      openNotificationWithIcon(
        "success",
        "Logout Successful",
        "You have been logged out successfully"
      );
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // Effects
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("konnect_cart"));
    if (savedCart) dispatch(addToCart(savedCart));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !userData) dispatch(fetchUserProfile());
  }, [isAuthenticated, userData, dispatch]);

  useEffect(() => {
    let isMounted = true;
    const fetchNotifications = async () => {
      if (isAuthenticated && userData) {
        try {
          let res = await _get_user_notification({ page: 1, per_page: 10 });
          if (isMounted) setNotificationData(res.data.data);
        } catch (err) {
          if (isMounted && !err.response) {
            openNotificationWithIcon("error", "Network Error", err?.message);
          }
        }
      } else if (isMounted) setNotificationData([]);
    };
    fetchNotifications();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, userData]);

  useEffect(() => {
    if (!isAuthenticated) {
      setNotificationData([]);
      setOpen(false);
      setOpenNotificationModal(false);
    }
  }, [isAuthenticated]);

  const userFirstName = userData?.first_name?.trim() || "";
  const cartCount = cart?.data?.length || 0;
  const notificationCount = notificationData.length;

  const desktopNavItems = (
    <>
      <li><Link className="text-base" to="/restaurant">Restaurants</Link></li>
      <li><Link className="text-base" to={AppRoutes.contact}>Contact us</Link></li>
      <li><Link className="text-base" to={AppRoutes.terms}>Terms</Link></li>
      <li><Link className="text-base" to={AppRoutes.policies}>Policy</Link></li>
    </>
  );

  const scrollingText = "Order food & get a cashback every Sunday";

  return (
    <div className="sticky top-0 z-[100]">
      {/* Scrolling Banner (desktop only) */}
      <div className="bg-[#063F29] overflow-hidden py-2 relative hidden md:block">
        <div className="flex animate-scroll">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
            <span className="text-white text-sm px-8">{scrollingText}</span>
          </div>
        </div>
      </div>

      <Modal
        title="How It Works"
        open={showCashbackModal}
        onCancel={() => setShowCashbackModal(false)}
        footer={[
          <button
            key="okay"
            className="bg-[#063F29] text-white px-6 py-2 rounded-lg"
            onClick={() => setShowCashbackModal(false)}
          >
            Okay
          </button>,
        ]}
        centered
      >
        <ul className="list-disc pl-5 space-y-3">
          <li>Download the mobile app.</li>
          <li>Click Tools & Referral information</li>
          <li>Share with friends & earn cash weekly</li>
        </ul>
        <MobileDownloadStores />
      </Modal>

      <div
        className={`flex items-center justify-between px-4 md:px-6 py-3 bg-white ${
          noShadow ? "" : "shadow-md"
        } ${adjustNavSize ? "py-2" : ""}`}
      >
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={Logo} className="h-7" alt="konnect logo" />
          </Link>
          <ul className="hidden md:flex gap-6 items-center">{desktopNavItems}</ul>
        </div>

        <div className="flex items-center gap-6">
          <div onClick={() => isAuthenticated ? setOpenNotificationModal(true) : navigate(AppRoutes.signin)}>
            <Badge count={notificationCount}>
              <img src={bellIconUrl} className="h-5 cursor-pointer" alt="bell" />
            </Badge>
          </div>

          {showCart && (
            <Link to={restaurantCart ? "/restaurant/1" : "/cart"}>
              <Badge count={cartCount}>
                <img src={cartIconUrl} className="h-6 cursor-pointer" alt="cart" />
              </Badge>
            </Link>
          )}

          {isAuthenticated && userData ? (
            <Link to={AppRoutes.profile_loyalty} className="px-3 py-1 rounded bg-[#063F29] text-white hidden md:inline-block">
              Hi, {userFirstName}
            </Link>
          ) : (
            <div className="hidden md:flex gap-6 items-center">
              <Link to={AppRoutes.signin}>Sign In</Link>
              <Link
                to={AppRoutes.signup}
                className="px-8 py-3 rounded-full text-sm bg-[#063F29] text-white"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile user icon replaces Sign In/Up and menu button */}
          <button
            type="button"
            aria-label="User"
            onClick={() => (isAuthenticated ? navigate(AppRoutes.profile_loyalty) : navigate(AppRoutes.signin))}
            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      <Drawer
        title={
          <div className="flex justify-between items-center">
            <Link to="/">
              <img src={Logo} className="h-10" alt="logo" />
            </Link>
            <img src={cancelIconUrl} onClick={onClose} className="h-6 cursor-pointer" alt="close" />
          </div>
        }
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <ul className="space-y-4">
          <li><Link to={AppRoutes.restaurant}>Restaurants</Link></li>
          <li><Link to={AppRoutes.contact}>Contact us</Link></li>
          <li><Link to={AppRoutes.terms}>Terms</Link></li>
          <li><Link to={AppRoutes.policies}>Policy</Link></li>
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout} className="text-red-600 font-bold">
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </Drawer>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[101]">
        <ul className="flex justify-around items-center py-2 text-xs">
          {/* Home */}
          <li className="flex-1">
            <button
              onClick={() => navigate("/")}
              className={`w-full flex flex-col items-center gap-1 ${location.pathname === "/" ? "text-[#063F29]" : "text-gray-700"}`}
            >
              {/* Home icon (inline svg) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 10v10h4v-6h6v6h4V10" />
              </svg>
              <span>Home</span>
            </button>
          </li>

          {/* Restaurants */}
          <li className="flex-1">
            <button
              onClick={() => navigate(AppRoutes.restaurant)}
              className={`w-full flex flex-col items-center gap-1 ${location.pathname.startsWith("/restaurant") ? "text-[#063F29]" : "text-gray-700"}`}
            >
              {/* Restaurant/store icon (inline svg) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7h18l-2 5H5L3 7z" />
                <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
              </svg>
              <span>Restaurants</span>
            </button>
          </li>

          {/* Notifications */}
          <li className="flex-1">
            <button
              onClick={() => (isAuthenticated ? setOpenNotificationModal(true) : navigate(AppRoutes.signin))}
              className="w-full flex flex-col items-center gap-1 text-gray-700"
            >
              <Badge count={notificationCount} size="small">
                <img src={mobileNotificationIconUrl} className="h-6 w-6" alt="notifications" />
              </Badge>
              <span>Alerts</span>
            </button>
          </li>

          {/* Menu (More) opens the left drawer) */}
          <li className="flex-1">
            <button
              onClick={() => setOpen(true)}
              className="w-full flex flex-col items-center gap-1 text-gray-700"
            >
              <img src={mobileMenuIconUrl} className="h-6 w-6" alt="menu" />
              <span>Menu</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
