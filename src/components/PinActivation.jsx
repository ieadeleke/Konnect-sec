import { Modal } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export const PinActivation = ({ open, toClose, onModalClose, accountId }) => {
  const navigate = useNavigate()

  const handleCancelModal = () => {
    toClose(true); 
  };

  return (
    <Modal
      open={open}
      footer={false}
      onCancel={handleCancelModal}
      className=""
    >
      <div className="flex flex-col justify-center mt-10 items-center">
        <h2 className="text-green-800 font-bold text-center my-4 text-4xl">Secure Your Account!</h2>
        <p className="text-3xl text-center font-bold">Activate your Login PIN for added protection. </p>
        <span className='py-2 px-4 bg-slate-300 shadow-md mt-3 font-bold ' >Your Account ID: { accountId }  </span>
        <button onClick={() => navigate('/profile/overview?keypin=6')} className="rounded-button font-gilroyBold my-7 focus:outline-none">
            Activate Login PIN
        </button>
      </div>
    </Modal>
  );
};
