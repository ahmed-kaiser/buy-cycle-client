import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";

const Advertise = () => {
  const [advertise, setAdvertise] = useState([]);

  useEffect(() => {
    axios({ url: `http://localhost:5000/advertise` })
      .then((res) => setAdvertise(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {advertise?.length > 0 && (
        <section className="p-4 lg:p-8 bg-slate-100 my-20">
          <Slide arrows={false} duration={6000} transitionDuration={2000} easing="ease-in" >
            {advertise?.map((item) => (
              <div className="container mx-auto max-w-md lg:max-w-screen-md space-y-12">
                <div className="flex flex-col overflow-hidden shadow-sm lg:flex-row rounded-lg">
                  <img
                    src={item.productDetails.image}
                    alt=""
                    className="h-64 sm:h-80 aspect-video"
                  />
                  <div className="flex flex-col justify-center flex-1 p-6 bg-gray-50">
                    <h1 className="font-medium text-lg">
                      {item.productDetails.title}
                    </h1>
                    <p><span className="font-medium">price:</span> ${item.productDetails.selling_price}</p>
                    <p>
                      <span className="font-medium">Location:</span> {item.productDetails.area},{" "}
                      {item.productDetails.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slide>
        </section>
      )}
    </>
  );
};

export default Advertise;