import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { CSSProperties, useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./MediaCarousel.module.css";
import { TrashIcon } from "@/icons/icon.Trash";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { PencilFillIcon } from "@/icons/icon.Pencil";
import { CropIcon } from "@/icons/icon.Crop";
import {
  LeftArrowCircleFillIcon,
  RightArrowCircleFillIcon,
} from "@/icons/icon.Arrow";
import { CropMedia } from "@/components/CropMedia/CropMedia";
export const MediaCarousel = ({
  mediaStyle,
  previewFiles,
  setPreviewFiles,
  editMode,
  style,
  controlsFontSize = "2rem",
}: {
  mediaStyle: CSSProperties;
  previewFiles: previewFile[];
  setPreviewFiles?: React.Dispatch<React.SetStateAction<previewFile[]>>;
  editMode?: boolean;
  style?: CSSProperties;
  controlsFontSize?: string | number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(previewFiles[0].id);

  const nextAndPrevButtonsSharedStyles: CSSProperties = {
    alignItems: "center",
    backgroundColor: "transparent",
    width: "fit-content",
    height: "fit-content",
  };

  const [cropping, setCropping] = useState<boolean>(false);

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
      }}
    >
      {previewFiles.map((previewFile) => (
        <>
          {previewFile.id === currentIndex ? (
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {editMode && setPreviewFiles ? (
                <div style={{ width: "100%" }}>
                  <EditButtons
                    previewFile={previewFile}
                    previewFiles={previewFiles}
                    setPreviewFiles={setPreviewFiles}
                    setCurrentIndex={setCurrentIndex}
                    setCropping={setCropping}
                  />
                </div>
              ) : null}
              <div
                style={{
                  position: "relative",
                  border: "2px solid green",
                  maxHeight: "500px",
                  overflow: "hidden",
                }}
              >
                {previewFiles.length > 1 ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        zIndex: 10,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <ScaleHoverButton
                        onClick={() => {
                          setCurrentIndex(
                            (prev) =>
                              (((prev - 1) % previewFiles.length) +
                                previewFiles.length) %
                              previewFiles.length
                          );
                        }}
                        style={nextAndPrevButtonsSharedStyles}
                      >
                        <LeftArrowCircleFillIcon
                          fontSize={controlsFontSize}
                          color="var(--primary-color)"
                        />
                      </ScaleHoverButton>

                      <ScaleHoverButton
                        onClick={() => {
                          setCurrentIndex(
                            (prev) =>
                              (((prev + 1) % previewFiles.length) +
                                previewFiles.length) %
                              previewFiles.length
                          );
                        }}
                        style={nextAndPrevButtonsSharedStyles}
                      >
                        <RightArrowCircleFillIcon
                          fontSize={controlsFontSize}
                          color="var(--primary-color)"
                        />
                      </ScaleHoverButton>
                    </div>
                  </div>
                ) : null}

                {cropping && setPreviewFiles ? (
                  <CropMedia
                    mediaStyle={mediaStyle}
                    previewFile={previewFile}
                    setPreviewFiles={setPreviewFiles}
                  />
                ) : previewFile.type === "image" ? (
                  <img src={previewFile.src} style={mediaStyle} />
                ) : (
                  <video src={previewFile.src} style={mediaStyle} />
                )}
              </div>
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
};

const EditButtons = ({
  previewFile,
  previewFiles,
  setPreviewFiles,
  setCurrentIndex,
  setCropping,
}: {
  previewFile: previewFile;
  previewFiles: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setCropping: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  return (
    <div className={styles.buttonsContainer} style={{ zIndex: 2 }}>
      <ScaleHoverButton
        onClick={() => {
          setCropping((prev) => !prev);
        }}
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
  );
};

/*

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
*/
