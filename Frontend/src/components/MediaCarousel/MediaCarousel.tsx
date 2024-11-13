import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { CSSProperties } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./MediaCarousel.module.css";
export const MediaCarousel = ({
  previewFiles,
  setPreviewFiles,
  editMode,
  style,
}: {
  previewFiles: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
  editMode?: boolean;
  style?: CSSProperties;
}) => {
  return (
    <div className={styles.container}>
      <Carousel
        indicators={false}
        controls={false}
        style={{
          border: "",
          overflow: "hidden",
          ...style,
        }}
      >
        {previewFiles.map((previewFile) => (
          <Carousel.Item style={{ zIndex: 1 }}>
            {previewFile.type === "image" ? (
              <img src={previewFile.src} style={{ zIndex: 1 }} />
            ) : (
              <video src={previewFile.src} style={{ zIndex: 1 }} />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
