const BookingForm = ({ registerData, userInfo, handleForm }) => {
  return (
    <form onSubmit={handleForm} className="space-y-2 mt-4">
      <div>
        <label className="text-sm pl-1 text-gray-600">Product Title</label>
        <input
          type="text"
          name="product_title"
          placeholder="Title"
          defaultValue={registerData.title}
          readOnly
          className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
        />
      </div>
      <div>
        <label className="text-sm pl-1 text-gray-600">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          defaultValue={registerData.selling_price}
          readOnly
          className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
        />
      </div>
      <div>
        <label className="text-sm pl-1 text-gray-600">Your Name</label>
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
        <label className="text-sm pl-1 text-gray-600">Your Email</label>
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
        <label className="text-sm pl-1 text-gray-600">Phone Number</label>
        <input
          type="number"
          name="phone"
          placeholder="Type your phone number"
          required
          className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
        />
      </div>
      <div>
        <label className="text-sm pl-1 text-gray-600">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Type your location"
          required
          className="w-full border-gray-200 bg-gray-50 rounded-md focus:border-primary py-1.5"
        />
      </div>
      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-yellow-500 px-6 py-1 font-medium text-gray-700 rounded-md"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
