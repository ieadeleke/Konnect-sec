import { LoadingOutlined } from '@ant-design/icons/lib/icons';
import { Button } from 'antd';
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cartIconUrl from '../assets/images/icons/cart.svg';
import { addToCart } from '../slices/cartSlice';
import { updateCount } from '../slices/updateCountSlice';
const ProductCard = (props) => {
    const dispatch = useDispatch()
    const updateCounts = useSelector(state => state.updateCount.count);
    const [addToCartButton, setAddToCartButton] = useState(false);

    const uploadToCart = ({ product }) => {
        const get_cart = JSON.parse(localStorage.getItem('konnect_cart'))
        const timestamp = Date.now().toString();
        const randomNumbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        setAddToCartButton(true);
        if (!get_cart) {
            const set_cart = {
                product_id: `${timestamp + randomNumbers}`,
                order_id: `${timestamp + randomNumbers}`,
                data: [
                    {
                        id: `${1}`,
                        order_id: `${timestamp + randomNumbers}`,
                        product_id: product.id,
                        product_name: product.product_name,
                        product_image: product.product_image,
                        product_price: product.konnect_price,
                        supplier_price: product.sellers_price,
                        description: product.description,
                        weight: product.weight,
                        discount: product.konnect_price * product.discount_rate * 0.01,
                        discount_rate: product.discount_rate,
                        quantity: 1,
                        timestamp: Date.now(),
                        total_weight: 1 * product.weight,
                        total_price: 1 * product.konnect_price,
                        total_supplier_price: product.sellers_price,
                        cashback: 0,
                        subcat: product.subcat_id
                    }
                ],
                total_amount: product.konnect_price,
                total_supplier_price: product.sellers_price,
                total_weight: product.weight,
                coupon: 0,
                fee: 0,
                tax: 0,
                discount: 0,
                charges: 0,
                total_item: 1,
                delivery_fee: 0,
                delivery_opt: "home",
                delivery_date: "28-05-2023",
                delivery_data: {}
            }
            dispatch(addToCart(set_cart))
            setAddToCartButton(false);
            localStorage.setItem('konnect_cart', JSON.stringify(set_cart))
        } else {
            let index = get_cart.data.findIndex(x => x.product_id == product.id);
            let newProd = get_cart
            if (index == -1) {
                const new_cart = {
                    id: get_cart.data.length + 1,
                    order_id: get_cart.order_id,
                    product_id: product.id,
                    product_name: product.product_name,
                    product_image: product.product_image,
                    product_price: product.konnect_price,
                    supplier_price: product.sellers_price,
                    weight: product.weight,
                    discount: product.konnect_price * product.discount_rate * 0.01,
                    discount_rate: product.discount_rate,
                    description: product.description,
                    quantity: 1,
                    timestamp: Date.now(),
                    total_weight: 1 * product.weight,
                    total_price: 1 * product.konnect_price,
                    total_supplier_price: 1 * product.sellers_price,
                    cashback: 0,
                    subcat: product.subcat_id
                }
                newProd.data.push(new_cart)
                newProd.total_amount = newProd.total_amount + product.konnect_price
                newProd.total_item = newProd.data.length
                newProd.total_weight = newProd.total_weight + product.weight
                dispatch(addToCart(newProd))
                setAddToCartButton(false);
                localStorage.setItem('konnect_cart', JSON.stringify(newProd))
            }
            setAddToCartButton(false);
        }
        dispatch(updateCount(updateCounts + 1))
    }
    return (
        <div className="">
            <div className="">
                <img src={props.product.product_image} style={{ width: "120px", height: "120px" }} alt="product" />
                <div className="">
                    {!addToCartButton ?
                        <Button type="text" onClick={() => uploadToCart({ product: props.product })} className='card_btn'><img src={cartIconUrl} alt="cart" /></Button>
                        :
                        <Button type="text" className='card_btn'><LoadingOutlined style={{ fontSize: '20px' }} /></Button>
                    }
                </div>
            </div>
            <Link to={`/product/${props.product.product_name}/${props.product.id}`}>
                <h5 className="">{props.product.product_name}</h5>
                <div className="">
                    <div>
                        <span className="">NGN</span>
                        <NumberFormat
                            className=""
                            value={props.product.konnect_price} displayType={'text'} thousandSeparator={true} />
                    </div>
                    <p className="">Free shipping</p>
                </div>
            </Link>
        </div>

    )
}

export default ProductCard
