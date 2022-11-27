import { Slide } from "react-slideshow-image";
import img1 from "../../assets/images/header/b1.jpg";
import img2 from "../../assets/images/header/b3.jpg";
import img3 from "../../assets/images/header/b4.jpg";
import img4 from "../../assets/images/header/b5.jpg";

const Headers = () => {
  const images = [
    {
      img: img1,
      title: "Your old bicycle can be a good option for other.",
    },
    {
      img: img2,
      title: "Make your great deal here, with happiness.",
    },
    {
      img: img3,
      title: "Sell your old bicycle here just with a click.",
    },
    {
      img: img4,
      title: "you can't be sad while riding a bicycle.",
    },
  ];
  return (
    <section>
      <Slide arrows={false}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[350px] md:h-[600px] bg-gradient-to-r from-slate-600 to-slate-700">
            <img src={image.img} alt="" className="absolute object-cover w-full h-full mix-blend-overlay"/>
            <div className="absolute flex items-center justify-center text-3xl md:text-5xl font-serif font-bold text-center text-gray-300 w-full h-full">
                <h1 className="capitalize leading-tight max-w-xl px-5">{image.title}</h1>
            </div>
          </div>
        ))}
      </Slide>
    </section>
  );
};

export default Headers;
