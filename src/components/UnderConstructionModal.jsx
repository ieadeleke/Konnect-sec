import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
export const UnderConstructionModal = () => {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const handlePartnerCancel = () => {
    setPartnerModalOpen(false);
  };

  useEffect(() => {
    setPartnerModalOpen(true)
  }, [])

  return (
    <Modal
    open={partnerModalOpen }
    footer={false}
    onCancel={handlePartnerCancel}
    className=""
    centered={true}
  >
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-green-800 font-bold flex items-center my-4 text-5xl">Our grocery marketplace will resume soon.</h2>
      <p className="text-4xl font-bold">We're working with manufacturers and key wholesalers to meet your needs</p>
    </div>
  </Modal>
  )
}
