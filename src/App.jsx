// import 'antd/dist/antd.css'
// import 'react-phone-input-2/lib/style.css';

import { useEffect, useLayoutEffect, useState } from 'react';
import {Provider} from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
// import DashboardGuard from './components/dashboard/DashboardGuard'
// import Confirm from './components/transactions/Confirm'
// import Cart from './pages/Cart'
// import EachCategory from './pages/Category'
// import Contact from './pages/Contact'
// import FAQ from './pages/Faq'
// import Privacy from './pages/Privacy'
// import Search from './pages/Search'
// import SendMail from './pages/SendMail'
// import Shop from './pages/Shop'
// import Signin from './pages/Signin'
// import SingleProduct from './pages/SingleProduct'
// import SubCategories from './pages/SubCategories'
// import Terms from './pages/Terms'
// import Vendor from './pages/Vendor'
// import Wise9ja from './pages/wise9ja'
import store from './store'

// import PostCheckout from './components/transactions/PostCheckout'
// import KYCLanding from './pages/Landing/KYCLanding'
// import LandingConstruction from './pages/Landing/LandingConstruction'
// import LandingPage from './pages/Langing'
// import SaEmail from './pages/SL/saEmail'
// import SalesLanding from './pages/SalesLanding'
// import SoContact from './pages/SoContact'
// import VendorLanding from './pages/VendorLanding'
// import ChangePassword from './pages/changePassword'
// import SignupSuccessful from './pages/signup-successful'
// import Signup2 from './pages/signup2'
// import Wise9jaSuccess from './pages/wise9jasuccess'
// import WhyBills from './pages/minor/WhyBills'
// import RestaurantConstruction from './pages/Restaurant/construction'
// import SinglePage from './pages/Restaurant/SinglePage'
// import ReviewCheckout from './pages/Restaurant/ReviewCheckout'
// import CheckoutSuccessful from './pages/Restaurant/CheckoutSuccessful';
// import TrackOrder from './pages/Restaurant/TrackOrder'
// import RestaurantCartPage from "./components/Restaurant/RestaurantCartPage";

import HomePage from './pages/Home';
import Restaurant from './pages/Restaurant'
import SinglePage from './pages/Restaurant/SinglePage';
import Contact from './pages/Contact';
import Terms from './pages/Sec/termsofuse.jsx';
import Privacy from './pages/Sec/privacy.jsx';
import Signin from './pages/Auth/SignIn/index.jsx';
import SendMail from './pages/Auth/SendMail/index.jsx';
import Signup from './pages/Auth/Signup/index.jsx';



const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

const App = () => {
  const getIsMobile = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(max-width: 767px)').matches;

  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper>
          <Routes>

            <Route path="" exact element={isMobile ? <Navigate to="/restaurant" replace /> : <HomePage />} />
            <Route path="/home" exact element={isMobile ? <Navigate to="/restaurant" replace /> : <HomePage />} />
            <Route path="/restaurant" exact element={<Restaurant />} />
            <Route path="/*" exact element={<Navigate to="/home" />} />
            <Route path="/restaurant/:id" exact element={<SinglePage />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/faq" element={<FAQ />} /> */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/signin" exact element={<Signin />} />
            <Route path="/resetsendmail" exact element={<SendMail />} />
            <Route path="/verify-email" exact element={<SendMail />} />
            <Route path="/verify-passcode" exact element={<SendMail />} />
            <Route path="/resetsendmail" exact element={<SendMail />} />
            <Route path="/signup" exact element={<Signup />} />
            {/* <Route path="/signup" exact element={<Signup2 />} />
            <Route path="/signup2" exact element={<Signup2 />} />
            
            <Route path="/auth/reset-password/:id/:token" exact element={<ChangePassword />} />

            <Route path="/signupsuccessful" exact element={<SignupSuccessful />} />
            <Route path="/fv" element={<SalesLanding />} />
            <Route path="/vendor" element={<VendorLanding />} /> */}
            {/*
            <Route path="/home" exact element={<HomePage />} />
            <Route path="/restaurant/:id/checkout" exact element={<ReviewCheckout />} />
            <Route path="/restaurant/:id/checkout_successful" exact element={<CheckoutSuccessful />} />
            <Route path="/restaurant/:id/track_order" exact element={<TrackOrder />} />
            <Route path="/restaurant/:id/restaurant_cart" exact element={<RestaurantCartPage />} />
            <Route path="/restaurant2" exact element={<RestaurantConstruction />} />

            <Route path="/joinus" element={<Vendor />} />
            <Route path="/so-contact" element={<SoContact />} />
            


            <Route path="/wise9ja" exact element={<Wise9ja />} />
            <Route path="/wise9ja-success" exact element={<Wise9jaSuccess />} />
            <Route path="/confirm" exact element={<Confirm />} />
            <Route path="/confirm-checkout" exact element={<PostCheckout />} />

            <Route path="/restaurant/dashboard" exact element={<DashboardGuard location="restaurant_dash" />} />
            <Route path="/restaurant/profile" exact element={<DashboardGuard location="restaurant_profile" />} />
            <Route path="/restaurant/menu" exact element={<DashboardGuard location="restaurant_menu" />} />
            <Route path="/restaurant/menuTwo" exact element={<DashboardGuard location="restaurant_menu2" />} />
            <Route path="/restaurant/delivery" exact element={<DashboardGuard location="restaurant_delivery" />} />

            <Route path="/user/dashboard" exact element={<DashboardGuard location="dashboard" />} />
            <Route path="/loyalty" exact element={<Navigate to="/profile/loyalty" />} />
            <Route path="/profile/paybill-history" exact element={<DashboardGuard location="paybill" />} />
            <Route path="/profile/overview" exact element={<DashboardGuard location="dashboard" />} />
            
            <Route path="/profile/bills" exact element={<DashboardGuard location="bills" />} />
            <Route path="/why-upgrade" exact element={<WhyBills />} />
            <Route path="/profile/referral" exact element={<DashboardGuard location="referral" />} />
            <Route path="/profile/complete-kyc" exact element={<DashboardGuard location="complete_kyc" />} />
            <Route path="/profile/loyalty" exact element={<DashboardGuard location="loyalty" />} />
            <Route path="/profile/sl" exact element={<DashboardGuard location="sl" />} />
            <Route path="/profile/sa" exact element={<DashboardGuard location="sa" />} />
            <Route path="/review-order/:trans_id" exact element={<DashboardGuard location="review" />} />
            <Route path="/review" exact element={<Navigate to="/review-order" />} />
            <Route path="/order_history" exact element={<Navigate to="/profile/order_history" />} />
            <Route path="/sales/:id/" exact element={<DashboardGuard location="sa_so" />} />
            <Route path="/sales-review/:id" exact element={<DashboardGuard location="sales_review" />} />
            <Route path="/profile/order_history/" exact element={<DashboardGuard location="order_history" />} />
            <Route path="/profile/wishlist/" exact element={<DashboardGuard location="wishlist" />} />
            <Route path="/landing-construction" exact element={<LandingConstruction />} />
            <Route path="/kyc-landing" exact element={<KYCLanding />} />


            <Route path="/review-order/:trans_id" exact element={<DashboardGuard location="review" />} />
            <Route path="/review" exact element={<Navigate to="/review-order" />} />
            <Route path="/invitaion" exact element={<SaEmail />} />

            <Route path="/landing" exact element={<LandingPage />} />
            <Route path="/shop" exact element={<Shop />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/search" exact element={<Search />} />
            <Route path="/checkout" exact element={<DashboardGuard location="checkout" />} />
            <Route path="/product/:name/:id" exact element={<SingleProduct />} />
            <Route path="/subcategories/:subcategory_id" exact element={<SubCategories />} />
            <Route path="/categories/:category_id" exact element={<EachCategory />} /> */}
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Provider>
  )
}

export default App
