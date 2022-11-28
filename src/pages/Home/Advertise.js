import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import Loading from "../Shared/Loading";

const Advertise = () => {
  const [advertise, setAdvertise] = useState([]);

  useEffect(() => {
    axios({ url: `https://buy-cycle-server.vercel.app/advertise` })
      .then((res) => setAdvertise(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (advertise.length === 0) {
    return <Loading />;
  }

  return (
    <>
      {advertise?.length > 0 && (
        <section className="p-4 lg:p-8 bg-slate-100 my-20">
          <Slide
            arrows={false}
            duration={6000}
            transitionDuration={2000}
            easing="ease-in"
          >
            {advertise?.map((item, index) => (
              <div
                key={index}
                className="container mx-auto max-w-md lg:max-w-screen-sm space-y-12"
              >
                <div className="grid grid-cols-3 overflow-hidden rounded-lg">
                  <div className="object-center col-span-full w-full md:col-span-2">
                    <img
                      src={item.productDetails?.image}
                      alt=""
                      className="w-full h-64 sm:h-80"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 p-6 bg-gray-50 col-span-full md:col-span-1">
                    <h1 className="font-medium text-lg">
                      {item.productDetails?.title}
                    </h1>
                    <p>
                      <span className="font-medium">price:</span> $
                      {item.productDetails?.selling_price}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {item.productDetails?.area}, {item.productDetails?.city}
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
