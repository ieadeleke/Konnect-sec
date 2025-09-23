import React from 'react';
const RestaurantSlider = ({ children, title }) => {
  return (
    <div className="mt-8 px-4 md:px-24">
      <h4 className="text-2xl mb-4 md:mb-2 font-bold">{title}</h4>
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start mr-4 rounded-xl shadow-lg"
            style={{
              width: '75vw',
              scrollSnapAlign: 'start',
              marginRight: '1rem',
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSlider;