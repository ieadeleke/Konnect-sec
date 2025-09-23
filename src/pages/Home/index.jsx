import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import side_banner5 from "../../assets/images/homepage/side_banner_4.png";
import { useEffect, useState, useCallback } from "react";
import { Modal } from "antd";
import topHeader1 from "../../assets/images/homepage/topHeader1.png";
import appImg from "../../assets/images/homepage/appImg.png";
import chef from "../../assets/images/homepage/chef.png";
import bannerMeal from "../../assets/images/homepage/bannerMeal.png";
import SearchRestaurant from "../../components/SearchRestaurant";
import MobileDownloadStores from "../../components/MobileDownloadStores";
import { _get_profile } from "../../common/axios_services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [showCashbackModal, setShowCashbackModal] = useState(true);

  const userData = useSelector((state) => state.userProfile.dataFetched);

  const handleCloseCashbackModal = useCallback(() => {
    setShowCashbackModal(false);
  }, []);

  const getUserProfile = async () => {
    try {
      const result = await _get_profile();
      setIsVendor(result?.data?.data.is_so);
      setIsRestaurant(result?.data?.data.is_restaurant);
      setUserSignedIn(true);
    } catch (e) {
      if (e.response?.data?.message === "Unauthorized") {
        setUserSignedIn(false);
        localStorage.removeItem("konnect_token");
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (window.location.hash === "#partnerWithUs") {
      document.getElementById("partnerWithUs")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleRestaurantClick = () => {
    if (!userSignedIn) {
      navigate("/signin");
    } else if (userData?.is_vendor || userData?.is_restaurant) {
      navigate("/restaurant/dashboard");
    } else {
      navigate("/restaurant/dashboard");
    }
  };

  return (
    <div>
      <Navbar noShadow adjustNavSize />

      {/* Cashback Modal */}
      <Modal
        title="How It Works"
        open={showCashbackModal}
        onCancel={handleCloseCashbackModal}
        footer={null}
        centered
      >
        <div className="space-y-4">
          <h3 className="text-2xl leading-[1.3]">
            Download The App <br />& Get{" "}
            <span className="text-[#44843F] font-bold">NGN 16,500</span>
          </h3>
          <p className="my-2 text-sm leading-normal">
            To Buy Food From Restaurants Near You <br /> Don&apos;t Miss Out On This Offer
          </p>
          <MobileDownloadStores />
        </div>
      </Modal>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:h-screen min-h-[calc(100vh-5rem)] px-4 md:px-12">
        <img className="bg-[#f5f5f5] w-full rounded-xl md:rounded-none" src={topHeader1} alt="hero" />
        <div className="text-center md:text-left flex flex-col gap-y-2 mt-6 md:mt-0">
          <p className="text-3xl md:text-6xl font-black">Eat & tell others</p>
          <p className="text-3xl md:text-6xl font-black">Cash out weekly</p>
          <p className="text-3xl md:text-6xl font-black text-[#44843F]">You like? Yeah 👍 ☺️</p>
          <div className="mt-4 md:mt-5">
            <SearchRestaurant />
          </div>
        </div>
      </div>

      {/* Partner Section */}
      <div id="partnerWithUs" className="grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-12 mt-36 gap-8">
        <div className="text-center md:text-left flex flex-col gap-y-2">
          <p className="text-3xl md:text-6xl font-black">You Cook...</p>
          <p className="text-3xl md:text-6xl font-black">We Sell & Grow</p>
          <p className="text-3xl md:text-6xl font-black">Your Business</p>
          <button onClick={handleRestaurantClick} className="rounded-button w-max mt-4 md:mt-5">
            {!userSignedIn
              ? "Become a restaurant"
              : userData?.is_restaurant
              ? "My restaurant dashboard"
              : "Activate my restaurant"}
          </button>
        </div>
        <img src={chef} alt="chef" className="mx-auto max-w-full" />
      </div>

      {/* App Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-12 mt-36 gap-8">
        <img src={appImg} alt="app" className="mx-auto max-w-full" />
        <div className="text-center md:text-left flex flex-col gap-y-2">
          <p className="text-3xl md:text-6xl font-black">Get Cash</p>
          <p className="text-3xl md:text-6xl font-black">Weekly Via</p>
          <p className="text-3xl md:text-6xl font-black">Our App</p>
          <MobileDownloadStores />
        </div>
      </div>

      {/* Join Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-12 mt-36 gap-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-3xl md:text-6xl font-black">Join us today</p>
          <p className="text-3xl md:text-6xl font-black">& earn daily</p>
          <div className="mt-4 md:mt-5">
            {!userSignedIn ? (
              <a href="/signin" className="rounded-button">
                Eat, Refer & Earn Weekly
              </a>
            ) : (
              <button className="rounded-button">Eat, Refer & Earn Weekly</button>
            )}
          </div>
        </div>
        <img src={side_banner5} alt="side banner" className="mx-auto max-w-full" />
      </div>

      {/* Breakfast Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-12 my-36 gap-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-3xl md:text-6xl font-black">Think Breakfast</p>
          <p className="text-3xl md:text-6xl font-black">Lunch & Dinner</p>
          <p className="text-3xl md:text-6xl font-black">
            Think <span className="text-[#44843F] font-bold">Konnect</span>
          </p>
        </div>
        <img src={bannerMeal} alt="meal" className="mx-auto max-w-full" />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
