// ... (previous imports)
import React, { useEffect, useState } from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-auto  h-[70%] overflow-auto">
        <img src={imageUrl} alt="Full-sized Image" className="w-[100%] h-[100%]" />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem('user'));
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    if (storedUserData) {
      const userId = storedUserData.id;
      // Fetch gallery items for the specific user ID
      fetch(`http://localhost:8088/api/articles/gallery/${userId}`)
        .then(response => response.json())
        .then(data => setGalleryItems(data.gallery))
        .catch(error => console.error(error));
    }
  }, []);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const filterByTypeAndUser = (item) => {
    return (
      (!filterType ||
        (filterType === 'image' && item.image) ||
        (filterType === 'video' && item.video)) &&
      item.userId === storedUserData.id
    );
  };

  const filterByType = (type) => {
    setFilterType(type);
  };

  return (
    <div className="container mx-auto my-8">
    <h2 className="text-3xl font-semibold mb-4">Gallery</h2>
  
    {/* Filter buttons */}
    <div className="mb-4">
      <button onClick={() => filterByType(null)} className="mr-4 w-10 bg-primary rounded-md">
        All
      </button>
      <button onClick={() => filterByType('image')} className="mr-4 w-14 bg-primary rounded-md">
        Images
      </button>
      <button onClick={() => filterByType('video')} className="mr-4 w-14 bg-primary rounded-md">
        Videos
      </button>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {galleryItems.filter(filterByTypeAndUser).map(item => (
        <div key={item.id} className="p-4 shadow-md shadow-secondary rounded-md">
          <h3 className="text-xl font-semibold mb-2">{item.titre}</h3>
          {item.image && filterType !== 'video' && (
            <img
              src={item.image}
              alt="Image"
              className="mb-2 rounded-md h-48 md:h-64 w-full object-cover transition-transform duration-300 transform hover:scale-110 cursor-pointer"
              onClick={() => openModal(item.image)}
            />
          )}
          {item.video && filterType !== 'image' && (
            <video
              src={item.video}
              controls
              className="mb-2 rounded-md h-48 md:h-64 w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  
    {/* Render the modal if an image is selected */}
    {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
  </div>
  
  );
};

export default Gallery;
