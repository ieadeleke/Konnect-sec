import { useEffect, useState } from 'react';
import { _single_restaurant_menu } from "../../common/axios_services";
import { notification } from "antd";
import { useParams } from "react-router-dom";
import deleteIcon from "../../assets/images/restaurant/delete.svg";
import { useDispatch } from "react-redux";
import { changeQuantity, setRestaurant } from '../../slices/restaurantCartSlice';
import { LoadingOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";

const CartItem = (props) => {
    const { id: restaurantId } = useParams();
    const { data, packIndex, onDelete } = props;
    const { productId, quantity, extras = [] } = props.data;
    const [detail, setDetail] = useState(null);
    const [restaurantProducts, setRestaurantProducts] = useState([]);
    const [extrasState, setExtrasState] = useState([...extras]); 
    const dispatch = useDispatch();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: "",
            description: message,
        });
    };

    const fetchMenu = async (id) => {
        try {
            const response = await _single_restaurant_menu({
                page: 1,
                per_page: 10,
                id,
            });
            setRestaurantProducts(response?.data?.data || []);
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                "An error occurred while fetching product data.";
            openNotificationWithIcon("error", errorMessage);
        }
    };

    useEffect(() => {
        if (restaurantId) {
            dispatch(setRestaurant({ restaurantId }));
            fetchMenu(restaurantId);
        }
    }, [restaurantId, dispatch]);

    useEffect(() => {
        if (restaurantProducts.length > 0 && productId) {
            const foundProduct = restaurantProducts.find(
                (product) => product.id === productId
            );
            setDetail(foundProduct || null);
        }
    }, [restaurantProducts, productId]);

    const handleExtraQuantityChange = (extraId, change) => {
        setExtrasState((prevExtras) => {
            const updatedExtras = prevExtras.map((extra) =>
                extra.id === extraId
                    ? { ...extra, quantity: Math.max(1, extra.quantity + change) }
                    : extra
            );


            const finalExtras = updatedExtras.filter(extra => extra.quantity > 0);


            dispatch(
                changeQuantity({
                    productId,
                    quantity, 
                    extras: finalExtras, 
                })
            );

            return finalExtras; 
        });
    };

    const handleRemoveExtra = (extraId) => {
        setExtrasState((prevExtras) => {
            const updatedExtras = prevExtras.filter((extra) => extra.id !== extraId);


            dispatch(
                changeQuantity({
                    productId,
                    quantity, 
                    extras: updatedExtras, 
                })
            );

            return updatedExtras; 
        });
    };

    const handleMinusQuantity = () => {
        dispatch(
            changeQuantity({
                productId: productId,
                quantity: quantity - 1,
            })
        );
    };

    const handleAddQuantity = () => {
        dispatch(
            changeQuantity({
                productId: productId,
                quantity: quantity + 1,
            })
        );
    };

    const discount = detail?.discount ? parseFloat(detail.discount) : 0;
    const originalPrice = parseFloat(detail?.public_price);





    const totalExtrasPrice = extrasState.reduce(
        (sum, extra) => sum + extra.price * extra.quantity,
        0
    );

    const totalAmount = quantity * originalPrice + totalExtrasPrice;

    return (
        <div>
            {detail ? (
                <div className={"mb-10"}>
                    <div className="flex flex-col gap-3 mb-5">
                        <div className="flex justify-between mb-3">
                            <p className="font-bold text-black text-3xl">
                                Pack {packIndex}
                            </p>
                            <div>
                                <img src={deleteIcon} onClick={onDelete} alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col mt-3">
                            <div className="flex justify-between">
                                <p className="text-3xl text-black font-bold">
                                    {detail.name}
                                </p>
                                <div className="flex rounded-2xl border bg-transparent py-2 px-10">
                                    <button className="text-2xl" onClick={handleMinusQuantity}>
                                        -
                                    </button>
                                    <span  className="text-2xl" >{quantity}</span>
                                    <button className="text-2xl" onClick={handleAddQuantity}>
                                        +
                                    </button>
                                </div>
                            </div>
                            <p className="text-[#000] font-bold text-[16px]">
                                <NumberFormat
                                    value={originalPrice * quantity}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    prefix={" ₦"}
                                />
                            </p>
                        </div>
                    </div>
                    {extrasState.length > 0 && (
                        <div className="bg-[#E4E4E4] rounded-3xl my-5 py-3 px-4 border border-black">
                            <p className="text-black font-semibold">Your Selections</p>
                            {extrasState.map((extra) => (
                                <div className='my-8' key={extra.id}>
                                    <div className="flex justify-between items-center text-[#000] text-2xl mt-1">
                                        <span>{extra.item.name}</span>
                                        <div className="flex items-center gap-4">
                                        <span className="ml-4 font-bold">
                                            ₦{(extra.price * extra.quantity).toFixed(2)}
                                        </span>
                                        </div>
                                        <div
                                            className='w-[20%] border-2 border-slate-500 rounded-xl flex justify-between px-3 '>
                                            <button
                                                className="text-lg"
                                                onClick={() => handleExtraQuantityChange(extra.id, -1)}
                                            >
                                                -
                                            </button>
                                            <span>{extra.quantity}</span>
                                            <button
                                                className="text-lg"
                                                onClick={() => handleExtraQuantityChange(extra.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="text-lg"
                                            onClick={() => handleRemoveExtra(extra.id)}
                                            title="Remove this extra item"
                                        >
                                            🗑️
                                        </button>
                                    </div>
















                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CartItem;
