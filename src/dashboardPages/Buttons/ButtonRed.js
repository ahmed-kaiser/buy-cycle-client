import React from "react";

const ButtonRed = ({ children, onClick, disable = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className="bg-red-400 hover:bg-red-500 py-1 px-2 rounded-md text-gray-50 font-medium"
    >
      {children}
    </button>
  );
};

export default ButtonRed;
