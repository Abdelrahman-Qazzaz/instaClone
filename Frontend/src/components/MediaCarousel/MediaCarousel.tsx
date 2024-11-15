import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { CSSProperties, useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./MediaCarousel.module.css";
import { TrashIcon } from "@/icons/icon.Trash";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { PencilFillIcon } from "@/icons/icon.Pencil";
import { CropIcon } from "@/icons/icon.Crop";
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
  const editIconsSharedFontSize = {
    fontSize: "1rem",
    color: "var(--primary-color)",
  };

  function deletePreviewFile(previewFile: previewFile) {
    const filteredArray = previewFiles.filter(
      (elem) => elem.id !== previewFile.id
    );
    setPreviewFiles(filteredArray);
    setCurrentIndex(filteredArray[0].id);
  }

  function handleSelect(selectedIndex: number) {
    setCurrentIndex(selectedIndex);
  }
  return (
    <div style={{ ...style, width: "fit-content" }}>
      <Carousel
        onSelect={handleSelect}
        activeIndex={currentIndex}
        indicators={false}
        controls={true}
        style={{
          overflow: "hidden",
          zIndex: 0,
          width: "fit-content",
        }}
        interval={null}
      >
        {previewFiles.map((previewFile) => (
          <Carousel.Item
            style={{
              zIndex: 1,
              position: "relative",

              width: "fit-content",
              height: "fit-content",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "300px",
              }}
            >
              {editMode && (
                <div className={styles.buttonsContainer} style={{ zIndex: 2 }}>
                  <ScaleHoverButton
                    onClick={() => {}}
                    style={{
                      backgroundColor: "var(--gold)",
                      ...sharedEditButtonsStyles,
                    }}
                  >
                    <CropIcon
                      fontSize={editIconsSharedFontSize.fontSize}
                      color={editIconsSharedFontSize.color}
                    />
                  </ScaleHoverButton>
                  <ScaleHoverButton
                    onClick={() => {}}
                    style={{
                      backgroundColor: "var(--navy)",
                      ...sharedEditButtonsStyles,
                    }}
                  >
                    <PencilFillIcon
                      fontSize={editIconsSharedFontSize.fontSize}
                      color={editIconsSharedFontSize.color}
                    />
                  </ScaleHoverButton>
                  <ScaleHoverButton
                    onClick={() => deletePreviewFile(previewFile)}
                    style={{
                      backgroundColor: "var(--red)",
                      ...sharedEditButtonsStyles,
                    }}
                  >
                    <TrashIcon
                      fontSize={editIconsSharedFontSize.fontSize}
                      color={editIconsSharedFontSize.color}
                    />
                  </ScaleHoverButton>
                </div>
              )}
              {previewFile.type === "image" ? (
                <img src={previewFile.src} style={{ zIndex: 1 }} />
              ) : (
                <video src={previewFile.src} style={{ zIndex: 1 }} />
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
