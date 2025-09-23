import { useNavigate } from 'react-router-dom';
import oops from "../assets/images/restaurant/oops.jpg";
import FoodImg from "../assets/images/restaurant/_1.png";
import { FaStar, FaRegClock } from 'react-icons/fa';
import RestaurantSlider from './sliders/RestaurantSlider'; 
const parseTime = (timeString) => {
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let parsedHours = hours;
  if (period === 'PM' && parsedHours !== 12) parsedHours += 12;
  if (period === 'AM' && parsedHours === 12) parsedHours = 0;
  const date = new Date();
  date.setHours(parsedHours, minutes, 0, 0);
  return date;
};

export const FoodImageArea = ({ restaurants, isMobile }) => {
  const navigate = useNavigate();

  const getRestaurantStatus = (restaurant) => {
    const now = new Date();
    const openTime = parseTime(restaurant.open_time);
    let closeTime = parseTime(restaurant.close_time);

    if (closeTime < openTime) {
      closeTime = new Date(closeTime);
      closeTime.setDate(closeTime.getDate() + 1);
    }

    const isOpen = now >= openTime && now <= closeTime;
    const isBeforeOpening = now < openTime;

    if (isOpen && restaurant.is_open) {
      return 'OPEN NOW';
    }
    return isBeforeOpening 
      ? `OPENS TODAY AT ${restaurant.open_time}`
      : `OPENS TOMORROW AT ${restaurant.open_time}`;
  };

  return (
    <div className='bg-white px-2 md:px-5 py-5 rounded-3xl'>
      <div className="px-4 mb-8">
        <h1 className='text-3xl md:text-4xl font-bold'>Restaurants Near You</h1>
      </div>

      {!restaurants || restaurants.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-12">
          <img src={oops} width={200} className="mx-auto" alt='oops' />
          <h3 className="text-gray-600 mt-4">No Restaurant Found in your selected city</h3>
        </div>
      ) : (
        <>

          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="border border-solid border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white relative"
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                >
                  <div className="relative">
                    <img
                      src={restaurant.display_image || FoodImg}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-md uppercase font-medium">
                      {getRestaurantStatus(restaurant)}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-medium">
                          {restaurant.rating || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {restaurant.cuisines?.map((cuisine, index) => (
                        <span
                          key={index}
                          className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-gray-600">
                      <FaRegClock />
                      <span className="text-sm">
                        {restaurant.min_ready_time} mins
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden px-4">
            <div className="grid grid-cols-2 gap-4">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100"
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                >
                  <div className="relative">
                    <img
                      src={restaurant.display_image || FoodImg}
                      alt={restaurant.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-1 left-1 bg-black/90 text-white text-[10px] px-2 py-1 rounded-md uppercase">
                      {getRestaurantStatus(restaurant)}
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold truncate">{restaurant.name}</h3>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-xs">
                          {restaurant.rating || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-gray-600">
                      <FaRegClock className="text-xs" />
                      <span className="text-xs">
                        {restaurant.min_ready_time} mins
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};