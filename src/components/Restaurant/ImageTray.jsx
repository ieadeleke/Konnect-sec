import { useEffect, useState } from 'react';
import { Tabs, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  _single_restaurant_menu,
  _get_categories,
} from '../../common/axios_services';
import { FoodCard } from './FoodCard';
const { TabPane } = Tabs;

export const ImageTray = (props) => {


  const TabContent = ({ items }) => (
    <>
      <p className="text-lg md:text-xl text-gray-600 mt-10">
        Click the menu to select extras
      </p>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-y-20 gap-2 mb-36 mt-6">
        {items.map((item, index) => (
          <FoodCard key={index} item={item} isOpen={props.isOpen} />
        ))}
      </div>
    </>
  );

  const { id: restaurantId } = useParams();
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [categoryTags, setCategoryTags] = useState([]);

  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: '',
      description: message,
    });
  };


  const getCategories = async () => {
    try {
      setLoading(true);
      const categories = await _get_categories();
      setCategoryTags(categories.data.data);
    } catch (err) {
      if (err.response) {
        openNotificationWithIcon('error', err.message);
      }
    } finally {
      setLoading(false);
    }
  };


  const fetchMenu = async (id) => {
    setLoading(true);
    try {
      const response = await _single_restaurant_menu({
        page: 1,
        per_page: 500,
        id,
      });

      const menuData = response?.data?.data || [];
      const categorizedData = {
        All: menuData, 
      };


      categoryTags.forEach((category) => {
        categorizedData[category.name] = menuData.filter((item) =>
          item.category?.some((cat) => cat.category_id === category.id)
        );
      });

      setMenu(categorizedData);
      setRestaurantProducts(menuData); 
    } catch (err) {
      if (err?.response?.data?.message) {
        if (err?.code === 'ERR_NETWORK') {
          openNotificationWithIcon(
            'error',
            'An error occurred while fetching product data. Please check network and try again'
          );
        } else {
          openNotificationWithIcon('error', err?.response?.data?.message);
        }
      } else {
        openNotificationWithIcon(
          'error',
          'An error occurred while fetching product data. Please reload page to try again'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchMenu(restaurantId); 
    }
  }, [restaurantId, categoryTags]);

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) return <p>Loading menu...</p>;
  if (!menu.All || menu.All.length === 0) return <p className='text-lg'>No menu available.</p>;
  return (
    <>
      <Tabs defaultActiveKey="All">
        {Object.keys(menu).map((key) => (
          <TabPane tab={key} key={key}>
            <TabContent items={menu[key]} />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};
