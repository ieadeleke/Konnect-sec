import { Modal } from 'antd';
import { useState } from 'react';

export default function MenuTipsContent() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div
      className="overflow-y-auto max-h-screen"
      style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}
    >
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
      <h2 className="text-green-800 font-bold flex items-center my-4 mt-8 text-3xl md:text-5xl">
        Restaurant Menu & Extras Tips
      </h2>
      <div className="space-y-12">
        <div>
          <h3 className="text-3xl">HOW TO ADD MENU & EXTRAS</h3>
          <ol className="list-decimal list-inside">
            <li>Create Extras before you create a Menu</li>
            <li>
              Create Menu, as a single item for example: Fried rice, Ofada rice with stew, Amala 2 wraps etc.
            </li>
            <li>Then add all necessary Extras and prices must include cost of packaging</li>

            <li>
              Menu served in a 1 litre food container{' '}
              <span
                onClick={() => {
                  setModalOpen(true);
                }}
                className="text-blue-500 underline font-bold hover:cursor-pointer"
              >
                (view)
              </span>
            </li>
          </ol>
        </div>
        <div>
          <h3 className="text-3xl">SUGGESTED EXTRAS</h3>
          <ul>
            <li>
              Protein, Drinks, Swallows, Local soups and Specials
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-3xl">MENU CATEGORIES</h3>
          <ul>
            <li>
              <strong>Confectioneries</strong> – Cakes, Burger, Meat pies, Buns
            </li>
            <li>
              <strong>Local soups</strong> – Eforiro, Egusi, Special okra, Ofe-nsala, Edi Kaikan
            </li>
            <li>
              <strong>Rice dishes</strong> - White rice, Jollof rice, Fried rice, Ofada rice, etc
            </li>
            <li>
              <strong>Bean dishes</strong> – Ewa aganyin, Plantain beans, Beans etc.
            </li>
            <li>
              <strong>Swallows</strong> – Amala, Pounded yam, Eba, Wheat, Semo etc
            </li>
            <li>
              <strong>Specials</strong> – Yam porridge, Moimoi, Akara, Shawarma, Peper soup etc.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
