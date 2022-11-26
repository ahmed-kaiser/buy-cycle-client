import { createContext, useState } from "react";

export const ModalContext = createContext();

const GlobalModalContext = ({ children }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ store, setStore ] = useState({});

  const handleShowModal = () => {
    return setShowModal(!showModal);
  };

  const modalData = (title, key, callback) => {
    setStore({title:title, key:key, performOperation:callback});
  };

  const handleConfirm = () => {
    store.performOperation(store.key);
    handleShowModal();
  };

  const sharedData = {
    handleShowModal,
    handleConfirm,
    modalData
  };

  return (
  <ModalContext.Provider value={sharedData}>
    {children}
    <section className={`absolute w-full h-screen ${!showModal && "hidden"}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xs p-4 bg-gray-200 rounded-md shadow-md text-center">
        <p>
          Are you sure you want to delete "
          <span className="font-medium">{ store?.title }</span>"
        </p>
        <div className="space-x-2 mt-3">
          <button
          onClick={handleConfirm}
            className="py-1 px-2 text-white font-medium bg-red-400 hover:bg-red-500 rounded-md"
          >
            Confirm
          </button>
          <button
            onClick={handleShowModal}
            className="py-1 px-2 bg-green-500 hover:bg-green-600 rounded-md text-white font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  </ModalContext.Provider>);
};

export default GlobalModalContext;
