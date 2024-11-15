import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { CSSProperties, useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./MediaCarousel.module.css";
import { TrashIcon } from "@/icons/icon.Trash";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { PencilFillIcon } from "@/icons/icon.Pencil";
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
  const [currentIndex, setCurrentIndex] = useState(previewFiles[0].id);
  const sharedEditButtonsStyles = {
    width: "fit-content",
    padding: "0.1rem",
    borderRadius: "0.2rem",
  };
  const editIconsSharedFontSize = "1rem";

  function deletePreviewFile(previewFile: previewFile) {
    const filteredArray = previewFiles.filter(
      (elem) => elem.id !== previewFile.id
    );
    setPreviewFiles(filteredArray);
    setCurrentIndex(filteredArray[0].id);
  }
  return (
    <div style={style}>
      <Carousel
        indicators={false}
        controls={false}
        style={{
          border: "",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {previewFiles.map(
          (previewFile) =>
            previewFile.id === currentIndex && (
              <Carousel.Item style={{ zIndex: 1, position: "relative" }}>
                {editMode && (
                  <div className={styles.buttonsContainer}>
                    <ScaleHoverButton
                      onClick={() => {}}
                      style={{
                        backgroundColor: "var(--navy)",
                        ...sharedEditButtonsStyles,
                      }}
                    >
                      <PencilFillIcon fontSize={editIconsSharedFontSize} />
                    </ScaleHoverButton>
                    <ScaleHoverButton
                      onClick={() => deletePreviewFile(previewFile)}
                      style={{
                        backgroundColor: "var(--red)",
                        ...sharedEditButtonsStyles,
                      }}
                    >
                      <TrashIcon fontSize={editIconsSharedFontSize} />
                    </ScaleHoverButton>
                  </div>
                )}
                <div
                  style={{ position: "absolute", border: "2px solid red" }}
                ></div>
                {previewFile.type === "image" ? (
                  <img src={previewFile.src} style={{ zIndex: 1 }} />
                ) : (
                  <video src={previewFile.src} style={{ zIndex: 1 }} />
                )}
              </Carousel.Item>
            )
        )}
      </Carousel>
    </div>
  );
};
