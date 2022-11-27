import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/UserAuthContext";
import BookingForm from "./BookingForm";
import ProductDetailsCard from "./ProductDetailsCard";
import toast from "react-hot-toast";

const Category = () => {
  const { userInfo } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const params = useParams();

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    handleModal();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const booking = {
        buyerEmail: userInfo.email,
        buyerPhone: data.phone,
        buyerLocation: data.location,
        productId: bookingData._id,
        productTitle: bookingData.title,
        sellerEmail: bookingData.sellerEmail,
        paid: false
    };

    axios({
        method: 'post',
        headers: {
            authorization: `bearer ${localStorage.getItem('token')}`
        },
        url:`http://localhost:5000/bookings?email=${userInfo.email}`,
        data: booking
    })
    .then(res => {
        if(res.data.acknowledged) {
            toast.success("Bookings Confirmed Successfully...");
            e.target.reset();
            setToggleRefetch(!toggleRefetch);
        }
    })
    .catch(err => console.log(err))
  };

  useEffect(() => {
    axios({
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `http://localhost:5000/products/${params.id}?email=${userInfo.email}`,
    })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [params.id, userInfo.email, toggleRefetch]);

  return (
    <section className="py-6 sm:py-4">
      <div className="container p-6 mx-auto space-y-8 max-w-screen-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-600">All Products</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <ProductDetailsCard
              key={item._id}
              data={item}
              handleClick={handleModal}
              setBookingData={setBookingData}
              email={userInfo.email}
            />
          ))}
        </div>
      </div>
      <BookingForm
        showModal={showModal}
        handleModal={handleModal}
        setBookingData={setBookingData}
        bookingData={bookingData}
        userInfo={userInfo}
        handleForm={handleBooking}
      />
    </section>
  );
};

export default Category;
