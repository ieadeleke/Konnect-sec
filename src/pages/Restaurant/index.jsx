import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, notification, Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import Navbar from '../../components/Navbar';
import { LocationWrapper } from '../../components/LocationWrapper';
import Footer from '../../components/Footer';
import { _get_cities_by_state_code, _restaurants_in_lga } from '../../common/axios_services';
import ImageSlider from '../../components/sliders/ImageSlider';
import RestaurantCard from '../../components/Restaurant/RestaurantCard';

import ValentineImg from '../../assets/images/restaurant/vALENTInes.png';
import Promo from '../../assets/images/restaurant/refer.png';
import BonusImg from '../../assets/images/restaurant/bonus.png';
import CheckoutImg from '../../assets/images/restaurant/checkout.png';

const Restaurant = () => {
  const [allLgas, setAllLgas] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState('');
  const [tempSelectedLGA, setTempSelectedLGA] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();

  const promoImages = [Promo, BonusImg, CheckoutImg];

  const notify = (type, message) => {
    notification[type]({ description: message });
  };

  const fetchCities = async (stateCode = 'LA', keyword = '') => {
    try {
      const uploadedCities = await _get_cities_by_state_code(stateCode, keyword);
      setAllLgas(uploadedCities.data.data);
    } catch (err) {
      notify('error', err.message);
      setAllLgas([]);
    }
  };

  const fetchRestaurants = async (lga) => {
    try {
      const response = await _restaurants_in_lga({
        page: 1,
        per_page: 1000,
        state: 'Lagos',
        lga,
      });

      const lgaParts = lga.split('&').map((part) => part.trim().toLowerCase());
      const restaurants = response.data.data.sort((a, b) => b.rating - a.rating);

      const opened = restaurants.filter(
        (r) =>
          r.city &&
          lgaParts.some((part) => r.city.toLowerCase().includes(part)) &&
          r.status === 'approved' &&
          r.is_open
      );

      const closed = restaurants.filter(
        (r) =>
          r.city &&
          lgaParts.some((part) => r.city.toLowerCase().includes(part)) &&
          r.status === 'approved' &&
          !r.is_open
      );

      const filtered = [...opened, ...closed];
      setRestaurants(filtered.length ? filtered : []);
      // Persist current list order for SinglePage mobile pagination
      try {
        const ids = filtered.map((r) => r.id);
        localStorage.setItem('konnect_restaurant_list', JSON.stringify(ids));
      } catch (_) {}
      return filtered;
    } catch (err) {
      notify('error', err.message);
      setRestaurants([]);
      return [];
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lgaFromQuery = params.get('lga');

    const initialize = async () => {
      if (lgaFromQuery) {
        setSelectedLGA(lgaFromQuery);
        localStorage.setItem('selectedLGA', lgaFromQuery);

        const result = await fetchRestaurants(lgaFromQuery);
        if (!result.length) {
          notify('info', 'No restaurants available for this location.');
        }
      } else {
        setIsModalVisible(true);
        setRestaurants([]);
      }
      await fetchCities();
    };

    initialize();
  }, [location.search]);

  useEffect(() => {
    if (isModalVisible) setTempSelectedLGA('');
  }, [isModalVisible]);

  const handleLGAChange = async (value) => {
    setSelectedLGA(value);
    localStorage.setItem('selectedLGA', value);
    await fetchRestaurants(value);
    setIsModalVisible(false);
  };

  const handleAddLocation = async () => {
    if (!tempSelectedLGA) return;
    setSelectedLGA(tempSelectedLGA);
    localStorage.setItem('selectedLGA', tempSelectedLGA);
    await fetchRestaurants(tempSelectedLGA);
    setIsModalVisible(false);
  };

  return (
    <div className="bg-gray-100">
      <Navbar noShadow adjustNavSize />

      <LocationWrapper
        selectLoc
        selectedLGA={selectedLGA}
        handleLGAChange={handleLGAChange}
        lagosLga={allLgas}
      />

      <div className="px-4 md:px-20 mt-8 md:mt-14 mb-8 md:mb-12">
        <div className="relative w-full overflow-hidden rounded-xl md:rounded-3xl shadow-lg h-[150px] md:h-[300px]">
          <img src={ValentineImg} alt="promo" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">RESTAURANTS</h1>
          </div>
        </div>
      </div>

      <div className="mt-2 md:mt-16 px-4 md:px-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          <div className="md:col-span-3 md:hidden">
            <ImageSlider images={promoImages} />
          </div>
          <img src={Promo} alt="promo" className="w-full h-auto object-cover rounded-xl shadow-lg hidden md:block" />
          <img src={BonusImg} alt="bonus" className="w-full h-auto object-cover rounded-xl shadow-lg hidden md:block" />
          <img src={CheckoutImg} alt="checkout" className="w-full h-auto object-cover rounded-xl shadow-lg hidden md:block" />
        </div>
      </div>

      <div className="mt-16 px-4 md:px-24 md:mb-10">
        <h4 className="text-2xl md:text-2xl font-bold mb-6">Restaurants Near You</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        {!restaurants.length && (
          <p className="text-center text-gray-500 text-lg md:text-lg py-8">
            No restaurants found in this area
          </p>
        )}
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        closable={false}
        maskClosable={false}
        centered
      >
        <div className="bg-white p- 8 rounded-lg">
          <div className="flex justify-between items-center mb-">
            <h2 className="text-2xl md:text-2xl font-bold text-gray-800">Select Your Location</h2>
            <CloseCircleFilled
              onClick={() => setIsModalVisible(false)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
            />
          </div>

          <p className="text-gray-600 text-base mb-4">
            Choose your local area to see available restaurants
          </p>

          <Select
            value={tempSelectedLGA}
            onChange={(value) => setTempSelectedLGA(value)}
            className="w-full location-select"
            placeholder="Search or select location..."
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {allLgas.map((lga) => (
              <Select.Option key={lga.id} value={lga.city_name}>
                {lga.city_name}
              </Select.Option>
            ))}
          </Select>

          <button
            onClick={handleAddLocation}
            disabled={!tempSelectedLGA}
            className="rounded-button w-full text-sm !py-5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Location
          </button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default Restaurant;
