import { Badge } from 'antd';
import { useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setRestaurant } from '../slices/restaurantCartSlice';

export const CartWidget = ({ selectLoc }) => {
  const navigate = useNavigate();
  const { id: restaurantId } = useParams();
  const dispatch = useDispatch();


  const cartItems = useSelector((state) => state.restaurantCart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  useEffect(() => {
    if (restaurantId) {
      dispatch(setRestaurant({ restaurantId }));
    }
  }, [dispatch, restaurantId]);

  const handleCartClick = () => {
    if (restaurantId) {
      navigate(`/restaurant/${restaurantId}/restaurant_cart`);
    }
  };

  return (
    <div>
      {cartCount !== 0 && (
        <div
          className="bg-[#44843F] w-fit p-8 bottom-6 left-6 z-50 hover:cursor-pointer"
          onClick={handleCartClick} 
        >
          <Badge
            count={cartCount}
            offset={[0, 5]}
            size="small"
            className="m-auto"
          >
            <ShoppingCartOutlined
              style={{
                fontSize: '26px',
                color: '#fff',
                margin: 0,
              }}
            />
          </Badge>
        </div>
      )}
    </div>
  );
};
