import {Button, Card, Input, Typography} from 'antd';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { update_selected_menu, update_visibility } from '../../../slices/restaurantSlice';
import {_update_menu_qty} from '../../../common/axios_services.js';
import { openNotificationWithIcon } from '../../../common/utils/general.jsx';
import {useNavigate} from 'react-router-dom';
import defaultRestaurantMenu from '../../../assets/images/restaurant/defaultRestaurantMenu.jpeg'

const {Title, Text} = Typography;
const FoodCard = ({food}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {name, description, price, qty_available, discount, images} = food;
	const [quantity, setQuantity] = useState(qty_available);
	const [loading, setLoading] = useState(false); 


	const truncateText = (text, maxLength = 20) => {
		if (text.length > maxLength) {
			return `${text.substring(0, maxLength)}...`;
		}
		return text;
	};


	const updateQuantity = async (newQuantity) => {
		setLoading(true);
		try {
			await _update_menu_qty(food.id, newQuantity);
			setQuantity(newQuantity); 
		} catch (err) {
			if (err.response) {
				if (err.response.data.message === "Unauthorized") {
					localStorage.removeItem('konnect_token')
					navigate('/signin')
				}
				openNotificationWithIcon('error', err.response.data.title, err.response.data.message)
			} else {
				openNotificationWithIcon('error', err.message)
			}
		} finally {
			setLoading(false);
		}
	};


	const increment = () => {
		const newQuantity = quantity + 1;
		updateQuantity(newQuantity); 
	};

	const decrement = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			updateQuantity(newQuantity); 
		}
	};


	const handleInputChange = (e) => {
		const newQuantity = Number(e.target.value);
		setQuantity(newQuantity);
	};


	const handleInputPressEnter = (e) => {
		const newQuantity = Number(e.target.value);
		if (newQuantity > 0) {
			updateQuantity(newQuantity); 
		}
	};

	const handleMenuClick = (menu) => {
		dispatch(update_selected_menu(menu));
		dispatch(update_visibility(true));
	};

	const menuImage = images[0]?.url ? images[0]?.url : defaultRestaurantMenu

	return (
		<Card className="" cover={<img alt={name} src={menuImage} />} onClick={() => handleMenuClick(food)} hoverable>
			<div className="" style={{paddingBottom: '10px'}}>
				<Title level={5}>{name}</Title>
				<Text type="secondary">{truncateText(description)}</Text>
				<div className="">
					{discount > 0 && (
						<div>
							<Text delete>NGN {price}</Text>
						</div>
					)}
					<Text strong style={{marginLeft: discount > 0 ? '10px' : '0'}}>
						NGN {price - (price * discount) / 100}
					</Text>
				</div>
			</div>

		</Card>
	);
};

export default FoodCard;
