import React from "react";
import { RiCloseFill } from "react-icons/ri";
import BookingForm from "./BookingForm";
import ReportForm from "./ReportForm";

const CategoryModal = ({
  showModal,
  handleModal,
  operationType,
  registerData,
  userInfo,
  handleBookingForm,
  handleReportForm,
}) => {
  return (
    <div
      className={`absolute top-0 left-0 w-screen h-full ${
        !showModal && "hidden"
      }`}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 max-w-lg gap-4 p-2 rounded-md shadow-md sm:py-8 sm:px-4 bg-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">
            {operationType === "booking" ? "Booking Details" : "Report"}
          </h1>
          <button onClick={handleModal} className="absolute top-2 right-2">
            <RiCloseFill className="h-7 w-7" />
          </button>
        </div>
        {
        operationType === "booking"?
        <BookingForm registerData={registerData} userInfo={userInfo} handleForm={handleBookingForm}/>
        :
        <ReportForm registerData={registerData} userInfo={userInfo} handleForm={handleReportForm} />
      }
      </div>
    </div>
  );
};

export default CategoryModal;
