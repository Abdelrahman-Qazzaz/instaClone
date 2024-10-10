import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

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
    <div
      style={{
        position: "relative",
        border: "12px solid black",
        borderRadius: "12%",
        width: "270px",
        height: "555px",
        backgroundColor: "black",
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      <Carousel
        indicators={false}
        controls={false}
        style={{ overflow: "hidden" }}
      >
        {sources.map(
          (source, index) =>
            index === currentIndex && (
              <Carousel.Item>
                <img width="253px" height="540px" src={source} alt="" />
              </Carousel.Item>
            )
        )}
      </Carousel>
    </div>
  );
};
