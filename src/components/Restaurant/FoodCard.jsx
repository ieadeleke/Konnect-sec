import { useState } from 'react';
import { Button, Card, Checkbox, Modal } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/restaurantCartSlice';
import NumberFormat from 'react-number-format';
import RightDrawerTemplate from '../RightDrawerTemplate';
import { Info } from 'lucide-react';

const MINIMUM_STOCK_VALUE = 0;

export const FoodCard = ({ item, isOpen }) => {
  const discount = parseFloat(item.discount || 0);
  const originalPrice = parseFloat(item.public_price || 0);

  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [extraQuantities, setExtraQuantities] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const isAvaialable = item?.qty_available > MINIMUM_STOCK_VALUE;

  const handleExtraQuantityChange = (extraId, increment) => {
    setExtraQuantities((prevQuantities) => ({
      ...prevQuantities,
      [extraId]: Math.max(1, (prevQuantities[extraId] || 0) + increment),
    }));
  };

  const calculateTotalPrice = () => {
    const extrasPrice = selectedExtras.reduce((total, extra) => {
      return total + extra.price * (extraQuantities[extra.id] || 1);
    }, 0);
    return quantity * originalPrice + extrasPrice;
  };

  const handleCheckboxChange = (extraId, price, name) => {
    setSelectedExtras((prev) => {
      const isSelected = prev.find((extra) => extra.id === extraId);
      if (isSelected) {

        setExtraQuantities((prevQuantities) => {
          const newQuantities = { ...prevQuantities };
          delete newQuantities[extraId];
          return newQuantities;
        });
        return prev.filter((extra) => extra.id !== extraId);
      } else {

        setExtraQuantities((prevQuantities) => ({
          ...prevQuantities,
          [extraId]: 1, 
        }));
        return [
          ...prev,
          { id: extraId, price, item: { name } }, 
        ];
      }
    });
  };

  const handleAddToCart = () => {
    const extrasWithQuantities = selectedExtras.map((extra) => ({
      ...extra,
      quantity: extraQuantities[extra.id],
    }));

    dispatch(
      addToCart({
        productId: item.id,
        quantity,
        public_price: parseFloat(item.public_price),
        discount: parseFloat(item.discount),
        product_name: item.name,
        extras: extrasWithQuantities, 
      })
    );
    setIsDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    if (isAvaialable) {
      setIsDrawerOpen(true);
    }
  };
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <>
      <Card
        hoverable
        className={`max-w-[300px] rounded-xl shadow-md overflow-hidden rest_card_body border-2 hover:border-black ${isAvaialable ? '' : 'grayscale'
          }`}
        cover={
          <img
            className="object-cover h-[200px]"
            src={item.images[0]?.url || '/images/default-dish.jpg'}
            alt={item.name}
          />
        }
        onClick={isOpen ? handleDrawerOpen : () => {}}
      >
        <div className="">
          <h3 className="font-bold text-xl line-clamp-2">{item.name}</h3>
          <div className="flex justify-between flex-wrap items-center mt-4">
            <span className="text-black font-bold">
              <NumberFormat
                value={originalPrice}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
              />
            </span>
            {isAvaialable || (
              <p className="text-[12px] text-red-600 font-bold">
                Out of Stock!
              </p>
            )}
          </div>
        </div>
      </Card>

      <RightDrawerTemplate
        closeDrawer={handleDrawerClose}
        openDrawer={isDrawerOpen}
        width={450}
        title={'Menu Item'}
        sm={true}
      >
        <div className="flex flex-col gap-8 my-4 mt-8">
          <h2 className="text-[22px]">{item.name}</h2>
          <div className="singleRestaurant_img flex">
            <img
              src={item.images[0]?.url || '/images/default-dish.jpg'}
              alt={item.name}
              className="w-full h-[200px] object-cover"
            />
          </div>
          <div>
            <div className="space-y-8">

              <p className="text-[14px] text-black">
                Menu and Extras may be served in a 1 litre food container except for specials and confectionery{item.description ? ` ${item.description}` : ''}
              </p>
              <div>
                <Modal
                  open={modalOpen}
                  footer={null}
                  onCancel={() => setModalOpen(false)}
                >
                  <img
                    src="/images/dish-container.jpg"
                    alt="dish container"
                    className="m-auto w-full h-full"
                  />
                </Modal>

              </div>
            </div>
            <div className="w-full mt-8 flex justify-between items-center">
              <p className="my-3 font-bold text-2xl">
                Amount:
                <NumberFormat
                  value={originalPrice}
                  displayType={'text'}
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix={' ₦'}
                />
              </p>
              <div className="flex items-center py-1 px-6 rounded-2xl">
                <Button
                  shape="circle"
                  size="small"
                  className="justify-center hover:text-black flex items-center"
                  icon={<MinusOutlined />}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                />
                <span className="font-bold text-[15px]">{quantity}</span>
                <Button
                  shape="circle"
                  size="small"
                  className="justify-center hover:text-black flex items-center"
                  icon={<PlusOutlined />}
                  onClick={() => setQuantity((q) => q + 1)}
                />
              </div>
            </div>
          </div>

          {item.extras.length > 0 ? (
            <div className="w-full bg-[#FDF4D7] rounded-2xl p-6 border-black border">
              <p className="font-semibold text-black text-2xl mb-4">
                Select Options
              </p>
              <div className="w-full flex flex-col gap-4">
                {item.extras.map((extra) => {
                  if (!extra.item) return null;
                  const extraIsAvailable = extra.item.qty_available > 0;
                  return (
                    <div
                      key={extra.id}
                      className="flex items-center justify-between"
                    >
                      <Checkbox
                        className="foodCard_checkbox"
                        value={extra.item.id}
                        onChange={() =>
                          handleCheckboxChange(
                            extra.item.id,
                            extra.item.public_price,
                            extra.item.name 
                          )
                        }
                        disabled={!extraIsAvailable}
                      >
                        <div className="flex gap-2">
                          <span className="line-clamp-2">
                            {extra.item.name}
                          </span>
                          {!extraIsAvailable && (
                            <span className="text-red-500 text-[10px] my-auto">
                              * Unavailable
                            </span>
                          )}
                        </div>
                      </Checkbox>
                      {selectedExtras.find(
                        (selected) => selected.id === extra.item.id
                      ) && (
                          <div className="flex items-center gap-2">
                            <Button
                              shape="circle"
                              size="small"
                              className="justify-center flex items-center"
                              icon={<MinusOutlined />}
                              onClick={() =>
                                handleExtraQuantityChange(extra.item.id, -1)
                              }
                            />
                            <span className="font-bold text-xl">
                              {extraQuantities[extra.item.id] || 1}
                            </span>
                            <Button
                              shape="circle"
                              size="small"
                              className="justify-center flex items-center"
                              icon={<PlusOutlined />}
                              onClick={() =>
                                handleExtraQuantityChange(extra.item.id, 1)
                              }
                            />
                          </div>
                        )}
                      <span className="font-bold text-2xl">
                        <NumberFormat
                          value={extra.item.public_price}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          prefix={'₦'}
                          className={`${extraIsAvailable ? '' : 'text-gray-300'
                            }`}
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No extras available for this item.</p>
          )}
          <div className="w-full flex justify-end px-4 items-center">
            <Button
              size="large"
              onClick={handleAddToCart}
              className="bg-[green] hover:bg-[#44843F] rounded-2xl border border-[green] text-white font-bold"
            >
              +
              <NumberFormat
                value={calculateTotalPrice()}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={' ₦'}
              />
            </Button>
          </div>
        </div>
      </RightDrawerTemplate>
    </>
  );
};
