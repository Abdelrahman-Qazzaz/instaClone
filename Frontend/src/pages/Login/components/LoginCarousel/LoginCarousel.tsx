import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Iphone } from "../../../../components/Iphone";

const sources: string[] = [
  "../../../../../public/chatpic.png",
  "../../../../../public/girlcatpic.png",
];
export const LoginCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sources.length);
  };

  return (
    <Carousel
      indicators={false}
      controls={false}
      style={{ zIndex: 1, border: "", overflow: "hidden" }}
    >
      {sources.map((source) => (
        <Carousel.Item style={{ zIndex: 1 }}>
          <img
            width="253px"
            height="540px"
            src={source}
            alt=""
            style={{ zIndex: 1 }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
