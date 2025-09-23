import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import { LocationWrapper } from '../../components/LocationWrapper';
import { SinglePageContent } from '../../components/Restaurant/SinglePageContent';
import RightDrawerTemplate from '../../components/RightDrawerTemplate';
import { CartWidget } from '../../components/CartWidget';

import briefCase from '../../assets/images/restaurant/suitcase_outline.svg';
import placeholderImage from '../../assets/images/homepage/restaurant_food.png';
import { _single_restaurant } from '../../common/axios_services';

const SinglePage = () => {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [restaurantRating, setRestaurantRating] = useState('NA');
  const [restaurantData, setRestaurantData] = useState({});
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [listIds, setListIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const fetchRestaurantInfo = async (id) => {
    try {
      const response = await _single_restaurant({ id });
      const restaurant = response.data.data;
      setRestaurantData(restaurant);
      setRestaurantRating(restaurant.rating || 'NA');
    } catch (err) {
      console.error('Error fetching restaurant:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) fetchRestaurantInfo(restaurantId);
  }, [restaurantId]);

  // Load restaurant list (stored from the listing page) for mobile prev/next
  useEffect(() => {
    try {
      const raw = localStorage.getItem('konnect_restaurant_list');
      if (raw) {
        const ids = JSON.parse(raw);
        setListIds(Array.isArray(ids) ? ids : []);
      } else {
        setListIds([]);
      }
    } catch (_) {
      setListIds([]);
    }
  }, []);

  useEffect(() => {
    if (!restaurantId || !listIds.length) {
      setCurrentIndex(-1);
      return;
    }
    const idx = listIds.findIndex((id) => String(id) === String(restaurantId));
    setCurrentIndex(idx);
  }, [restaurantId, listIds]);

  const hasPrev = useMemo(() => currentIndex > 0, [currentIndex]);
  const hasNext = useMemo(() => currentIndex >= 0 && currentIndex < listIds.length - 1, [currentIndex, listIds.length]);

  const goPrev = () => {
    if (!hasPrev) return;
    const prevId = listIds[currentIndex - 1];
    if (prevId) navigate(`/restaurant/${prevId}`);
  };

  const goNext = () => {
    if (!hasNext) return;
    const nextId = listIds[currentIndex + 1];
    if (nextId) navigate(`/restaurant/${nextId}`);
  };

  const getRestaurantImage = () => {
    if (restaurantData.display_image) return restaurantData.display_image;
    const kitchenImage = restaurantData.kitchen_images?.find((img) => img.url);
    return kitchenImage ? kitchenImage.url : placeholderImage;
  };

  const submitRating = () => {
    setIsModalVisible(false);
    setUserRating(0);
    setFeedback('');
  };

  return (
    <>
      <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
        <Navbar noShadow adjustNavSize />
        <LocationWrapper />

        <div className="flex justify-center">
          <div className="w-full max-w-7xl px-5 md:px-0">
            <div className="fle items-center flex-wrap justify-between gap-2 py-5">
              <div className="flex mb-4 items-center gap-1 md:gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="text-xl md:text-2xl text-green-700 hover:text-green-900 transition-colors"
                >
                  &larr;
                </button>
                <h1 className="text-green-700 text-2xl md:text-3xl">{restaurantData.name}</h1>
              </div>
              <div className="fle grid grid-cols-3 gap-5 md:gap-20">
                <div className="flex flex-col">
                  <p className="text-gray-500">Profile</p>
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => setIsDrawerVisible(true)}
                  >
                    <img src={briefCase} className="w-6" alt="About us" />
                    <p className="text-sm md:text-base font-semibold underline">
                      About Us
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-500">Avg Time</p>
                  <div className="flex gap-3 items-center">
                    <span className="text-sm">⏰</span>
                    <p className="text-sm md:text-base font-semibold">
                      {loading ? 'NA' : `${restaurantData.min_ready_time} mins`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-500">Rating</p>
                  <div className="flex gap-3 items-center">
                    <span className="text-sm text-orange-500">★</span>
                    <p className="text-sm md:text-base font-semibold">
                      {loading ? 'NA' : restaurantRating}
                    </p>
                  </div>
                </div>

                <button
                  className="py-2 px-10 text-sm font-bold bg-green-700 rounded-xl text-white hidden md:block"
                  onClick={() => setIsModalVisible(true)}
                >
                  Rate Us
                </button>
              </div>
            </div>
            <button
              className="py-2 px-10 text-sm font-bold bg-green-700 rounded-xl text-white mb-4 md:hidden"
              onClick={() => setIsModalVisible(true)}
            >
              Rate Us
            </button>
            <div className="">
              <div className="flex mx-auto mt-2">
                <img
                  src={getRestaurantImage()}
                  alt={restaurantData.name}
                  className="w-full h-[200px] md:h-[300px] rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:px-20 pt-10 md:pt-20">
          <SinglePageContent
            restaurantName={restaurantData.name}
            city={restaurantData.city}
            isOpen={restaurantData.is_open}
            restaurantImg={restaurantData.display_image}
          />
        </div>
      </div>

      <RightDrawerTemplate
        closeDrawer={() => setIsDrawerVisible(false)}
        openDrawer={isDrawerVisible}
        width={450}
        title="About Us"
      >
        <div>
          <h2 className="text-green-800 font-bold flex items-center mt-8 text-3xl">
            {restaurantData.name}
          </h2>
          <div className="singleRestaurant_img flex mx-auto mt-2">
            <img
              src={getRestaurantImage()}
              alt={restaurantData.name}
              className="w-full h-[250px] object-cover rounded-lg"
            />
          </div>
          <div className="mt-8">
            <p className="my-8">
              {restaurantData.description ||
                'No description available for this restaurant.'}
            </p>

            <div className="flex flex-col gap-y-5">
              <div>
                <h2>ALLERGENS</h2>
                <p>
                  You can call {restaurantData.name} to ask about their
                  ingredients and allergen information, production or cooking
                  methods. Call {restaurantData.name} on{' '}
                  <span className="font-bold">
                    +{restaurantData.contact_phone_code}
                    {restaurantData.contact_phone}
                  </span>
                </p>
              </div>
              <div>
                <h2>HYGIENE RATING</h2>
                <p>
                  Restaurant food hygiene rating is a good standing meaning the
                  kitchen has good hygiene practices.
                </p>
              </div>
              <div>
                <h2>LOCATION</h2>
                <p>{restaurantData.address}</p>
              </div>
              <div>
                <h2>NOTES</h2>
                <p>
                  All dishes may contain traces of the following allergens:
                  Gluten, Crustaceans, Eggs, Fish, Peanuts, Soybeans, Milk, Nuts
                  (e.g. almonds, hazelnuts, walnuts, cashews), For any questions
                  regarding the allergen contents of specific dishes please
                  contact the restaurant directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </RightDrawerTemplate>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">
              Rate {restaurantData.name}
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`${userRating >= star ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Leave your feedback..."
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-700 text-white"
                onClick={submitRating}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <CartWidget />

      {/* Mobile-only left/right pagination controls */}
      {currentIndex !== -1 && (
        <>
          {/* Left (Prev) */}
          {hasPrev && (
            <button
              onClick={goPrev}
              aria-label="Previous restaurant"
              className="md:hidden fixed left-2 top-1/2 -translate-y-1/2 z-50 bg-black/60 text-white rounded-full p-3 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}

          {/* Right (Next) */}
          {hasNext && (
            <button
              onClick={goNext}
              aria-label="Next restaurant"
              className="md:hidden fixed right-2 top-1/2 -translate-y-1/2 z-50 bg-black/60 text-white rounded-full p-3 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </>
      )}
    </>
  );
};

export default SinglePage;
