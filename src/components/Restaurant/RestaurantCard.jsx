import { FaStar, FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FoodImg from '../../assets/images/restaurant/_1.png';
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

const RestaurantCard = ({ restaurant }) => {
  const now = new Date();
  const openTime = parseTime(restaurant.open_time);
  let closeTime = parseTime(restaurant.close_time);


  if (closeTime < openTime) {
    closeTime = new Date(closeTime);
    closeTime.setDate(closeTime.getDate() + 1);
  }

  const isOpen = now >= openTime && now <= closeTime;
  const isBeforeOpening = now < openTime;

  let statusMessage;
  if (isOpen && restaurant.is_open) {
    statusMessage = 'OPEN NOW';
  } else {
    statusMessage = isBeforeOpening
      ? `OPENS TODAY AT ${restaurant.open_time}`
      : `OPENS TOMORROW AT ${restaurant.open_time}`;
  }

  return (
    <Link

      to={`/restaurant/${restaurant.id}`}
      className="block border border-solid border-[#e5e7eb] rounded-lg mb-4 hover:shadow-md transition-shadow duration-200 bg-white relative"
    >
      <div className="relative">
        <img
          src={restaurant.display_image ?? FoodImg}
          alt="promo"
          className={`w-full h-48 object-cover rounded-t-lg ${
            !restaurant.is_open && 'grayscale'
          }`}
        />
        <div className="absolute top-2 left-2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-md uppercase font-semibold tracking-wide">
          {statusMessage}
        </div>
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium text-gray-900">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1">
            <FaStar className="text-[#f59e0b] text-xl" />
            <span className="text-xl font-medium text-gray-900">
              {restaurant.rating}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1">
          {restaurant.cuisines?.map((cuisine, index) => (
            <span
              key={index}
              className="text-xs text-gray-500 font-medium capitalize"
            >
              {cuisine}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaRegClock className="text-gray-600 text-lg" />
            <span className="text-base font-medium text-gray-900">
              {restaurant.min_ready_time} mins
            </span>
          </div>
          <span className="text-base font-normal text-gray-800">
            {restaurant?.delivery_switch
              ? 'Pickup and Delivery'
              : 'Pickup only'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
