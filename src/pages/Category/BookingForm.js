import React from 'react';
import { RiCloseFill } from 'react-icons/ri';

const BookingForm = ({ showModal, handleModal, bookingData, userInfo, handleForm }) => {
    return (
        <div className={`absolute top-0 left-0 w-screen h-full ${!showModal && 'hidden'}`}>
           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 max-w-lg gap-4 p-2 rounded-md shadow-md sm:py-8 sm:px-4 bg-gray-100">
         <div className="flex items-center justify-between">
           <h1 className="font-medium text-lg">Booking Details</h1>
           <button onClick={handleModal} className="absolute top-2 right-2">
               <RiCloseFill className="h-7 w-7" />
           </button>
         </div>
         <form onSubmit={handleForm} className="space-y-2 mt-4">
           <div>
           <label className="text-sm pl-1 text-gray-600">
                 Product Title
           </label>
               <input
                 type="text"
                 name="product_title"
                 placeholder="Title"
                 defaultValue={bookingData.title}
                 readOnly
                 className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
               />
           </div>
           <div>
           <label className="text-sm pl-1 text-gray-600">
                 Price
           </label>
               <input
                 type="number"
                 name="price"
                 placeholder="Price"
                 defaultValue={bookingData.selling_price}
                 readOnly
                 className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
               />
           </div>
           <div>
           <label className="text-sm pl-1 text-gray-600">
                 Your Name
           </label>
               <input
                 type="text"
                 name="name"
                 placeholder="Username"
                 defaultValue={userInfo.displayName}
                 readOnly
                 className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
               />
           </div>
           <div>
           <label className="text-sm pl-1 text-gray-600">
                 Your Email
           </label>
               <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 defaultValue={userInfo.email}
                 readOnly
                 className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
               />
           </div>
           <div>
           <label className="text-sm pl-1 text-gray-600">
                 Phone Number
           </label>
               <input
                 type="number"
                 name="phone"
                 placeholder="Type your phone number"
                 required
                 className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
               />
             </div>
             <div>
             <label className="text-sm pl-1 text-gray-600">
                 Location
           </label>
               <input
                 type="text"
                 name="location"
                 placeholder="Type your location"
                 required
                 className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
               />
             </div>
             <div className="text-center pt-4">
               <button type="submit" className="bg-yellow-500 px-6 py-1 font-medium text-gray-700 rounded-md">Confirm</button>
             </div>
         </form>
       </div>
        </div>
     );
};

export default BookingForm;