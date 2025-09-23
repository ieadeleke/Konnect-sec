import { useState, useEffect } from "react";
import { Modal } from "antd";

const DiscountModal = ({ isVisible, onClose }) => {

    const DISCOUNT450_KEY = "discount450Expiry";
    const DISCOUNT30_KEY = "discount30Expiry";


    const calculateDaysLeft = (expiryDate) => {
        const now = new Date();
        const diffTime = new Date(expiryDate) - now; 
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0); 
    };


    const getOrSetExpiry = (key, days, isOneTime = false) => {
        const storedExpiry = localStorage.getItem(key);
        if (storedExpiry) {
            return storedExpiry;
        } else if (!isOneTime || !localStorage.getItem(key)) {
            const newExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
            localStorage.setItem(key, newExpiry);
            return newExpiry;
        }
        return null;
    };


    const discount450Expiry = getOrSetExpiry(DISCOUNT450_KEY, 7, true); 
    const discount30Expiry = getOrSetExpiry(DISCOUNT30_KEY, 14); 


    const [discount450, setDiscount450] = useState(discount450Expiry ? calculateDaysLeft(discount450Expiry) : 0);
    const [discount30, setDiscount30] = useState(calculateDaysLeft(discount30Expiry));

    useEffect(() => {
        const interval = setInterval(() => {
            if (discount450 > 0) {
                setDiscount450(calculateDaysLeft(discount450Expiry));
            } else {
                setDiscount30((prev) => {
                    const daysLeft = calculateDaysLeft(discount30Expiry);
                    if (daysLeft === 0) {

                        const newExpiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
                        localStorage.setItem(DISCOUNT30_KEY, newExpiry);
                        return 14;
                    }
                    return daysLeft;
                });
            }
        }, 1000 * 60 * 60 * 24); 

        return () => clearInterval(interval); 
    }, [discount450, discount30Expiry]);

    useEffect(() => {

        if (discount450 === 0 && discount30 === 0) {
            onClose();
        }
    }, [discount450, discount30, onClose]);

    return (
        <Modal
            open={isVisible}
            onCancel={onClose}
            footer={null}
            className="max-w-md mx-auto"
        >
            <div className="p-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Use your discount TODAY
                </h2>
                <div className="mt-4 space-y-4">
                    {discount450 > 0 && (
                        <div className="p-4 border rounded-lg bg-green-200">
                            <h3 className="text-md font-semibold text-gray-700">
                                10% discount order
                            </h3>
                            <p className="text-[12px] text-gray-600">Expires in {discount450} days</p>
                            <p className="text-[12px] text-gray-600">For 2 orders & order above <span className="font-bold">₦3,000</span> </p>
                        </div>
                    )}
                    {discount450 === 0 && discount30 > 0 && (
                        <div className="p-4 border rounded-lg bg-green-200">
                            <h3 className="text-md font-semibold text-gray-700">
                                Up to 30% discount on 4th order
                            </h3>
                            <p className="text-[12px] text-gray-600">Expires in {discount30} days</p>
                            <p className="text-[12px] text-gray-600">5% on first 3 orders</p>
                            <p className="text-[12px] text-gray-600">Order above<span
                                className="font-bold"> ₦3,000</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default DiscountModal;
