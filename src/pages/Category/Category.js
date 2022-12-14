import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/UserAuthContext";
import ProductDetailsCard from "./ProductDetailsCard";
import toast from "react-hot-toast";
import CategoryModal from "./CategoryModal";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import Loading from "../Shared/Loading";

const Category = () => {
  useScrollToTop();
  useTitle("Category")
  const { userInfo } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [operationType, setOperationType] = useState(null);
  const [registerData, setRegisterData] = useState({});
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
      productId: registerData._id,
      productTitle: registerData.title,
      sellerEmail: registerData.sellerEmail,
      price: registerData.selling_price,
      paid: false,
    };

    axios({
      method: "post",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `https://buy-cycle-server.vercel.app/bookings?email=${userInfo.email}`,
      data: booking,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Bookings Confirmed Successfully...");
          e.target.reset();
          setOperationType(null);
          setRegisterData({});
        }
      })
      .catch((err) => console.log(err));
  };

  const handleReport = (e) => {
    e.preventDefault();
    handleModal();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const report = {
      buyerEmail: userInfo.email,
      productId: registerData._id,
      productTitle: registerData.title,
      sellerEmail: registerData.sellerEmail,
      message: data.message,
      date: new Date(),
    };

    axios({
      method: "post",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `https://buy-cycle-server.vercel.app/report?email=${userInfo.email}`,
      data: report,
    })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Report Submitted Successfully...");
          e.target.reset();
          setOperationType(null);
          setRegisterData({});
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      url: `https://buy-cycle-server.vercel.app/products/${params.id}?email=${userInfo.email}`,
    })
      .then((res) => setProducts(res.data))
      .catch((err) => toast.error(err.message));
  }, [params.id, userInfo.email]);

  if(products.length === 0) {
    return <Loading />
  }

  return (
    <section className="py-6 sm:py-4 min-h-screen">
      <div className="container p-6 mx-auto space-y-8 max-w-screen-xl">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-600 border-b-2 border-gray-100 pb-2">
            All Products
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 ">
          {products.map((item) => (
            <ProductDetailsCard
              key={item._id}
              data={item}
              handleClick={handleModal}
              setRegisterData={setRegisterData}
              email={userInfo.email}
              setOperationType={setOperationType}
            />
          ))}
        </div>
      </div>
      <CategoryModal
        showModal={showModal}
        handleModal={handleModal}
        operationType={operationType}
        registerData={registerData}
        userInfo={userInfo}
        handleBookingForm={handleBooking}
        handleReportForm={handleReport}
      />
    </section>
  );
};

export default Category;
