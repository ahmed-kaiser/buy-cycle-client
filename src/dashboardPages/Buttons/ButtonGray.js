import React from "react";

const ButtonGray = ({ children, onClick, disable = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className="bg-gray-400 hover:bg-gray-500 py-1 px-2 rounded-md text-gray-50 font-medium"
    >
      {children}
    </button>
  );
};

export default ButtonGray;
