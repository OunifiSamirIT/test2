import React from 'react';
import Modal from 'react-modal';

const MyModal = ({ isOpen, closeModal, validationError }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          width: '300px', // Adjust the width as needed
          margin: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        },
      }}
    >
      <p className="text-red-500">{validationError}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={closeModal}
      >
        Close
      </button>
    </Modal>
  );
};

export default MyModal;
