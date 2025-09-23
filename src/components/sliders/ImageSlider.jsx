const ImageSlider = ({ images }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 pr-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start mr-4 rounded-xl shadow-lg"
            style={{
              width: '85vw',
              scrollSnapAlign: 'start',
              marginRight: index === images.length - 1 ? '0' : '1rem',
            }}
          >
            <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={image}
                alt={`Promo ${index + 1}`}
                className="w-full h-full object-contain"
                style={{ maxHeight: '200px' }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;