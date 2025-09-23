import { Modal } from 'antd';
import { useState } from 'react';

export const OpenResturantModal = ({ onOpen }) => {
  const modalKey = 'open-resturant-modal-prompt-flag';
  const setCheck = () => {
    sessionStorage.setItem(modalKey, 'checked');
  };
  const setUncheck = () => {
    sessionStorage.setItem(modalKey, 'unchecked');
  };
  if (sessionStorage.getItem(modalKey) === null) {
    setUncheck();
  }
  const [openModal, setOpenModal] = useState(
    {
      checked: false,
      unchecked: true,
    }[sessionStorage.getItem(modalKey)]
  );
  return (
    <Modal
      open={openModal}
      footer={false}
      onCancel={() => {
        setOpenModal(false);
        setCheck();
      }}
      className=""
    >
      <div className="flex flex-col justify-center mt-10 items-center">
        <h2 className="text-red-800 font-bold text-center my-4 text-4xl">
          Your Resturant is Closed!
        </h2>
        <p className="text-[14px] text-center font-bold px-4">
          Click the "Open Restaurant" button below to open up the restaurant,
          don't forget to update your opening stocks for your menu items and
          extras.
        </p>
        <button
          className="rounded-button font-gilroyBold my-7 focus:outline-none"
          onClick={() => {
            onOpen(true);
            setOpenModal(false);
            setCheck();
          }}
        >
          Open Resturant
        </button>
      </div>
    </Modal>
  );
};
