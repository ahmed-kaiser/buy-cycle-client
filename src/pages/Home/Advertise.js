import { useQuery } from "@tanstack/react-query";
import { Slide } from "react-slideshow-image";

const Advertise = () => {
  const { data: advertise, isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertise");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>loading......</div>;
  }

  return (
    <>
      {advertise?.length > 0 && (
        <section className="p-6">
          <div className="container max-w-xl mx-auto h-[400px]">
            <Slide arrows={false}>
              {advertise?.map((item) => (
                <div key={item._id} className="h-full w-full">
                  <img
                    src={item.productDetails[0].image}
                    alt=""
                    className="cover-full h-full"
                  />
                  
                </div>
              ))}
            </Slide>
          </div>
        </section>
      )}
    </>
  );
};

export default Advertise;
