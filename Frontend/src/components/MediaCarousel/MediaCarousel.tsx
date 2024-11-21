import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { CSSProperties, useState } from "react";

import styles from "./MediaCarousel.module.css";
import { TrashIcon } from "@/icons/icon.Trash";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";

import { CropIcon } from "@/icons/icon.Crop";
import {
  LeftArrowCircleFillIcon,
  RightArrowCircleFillIcon,
} from "@/icons/icon.Arrow";
import { CropMedia } from "@/components/CropMedia/CropMedia";
import { useCreatePostStore } from "@/store/useCreatePostStore";
export const MediaCarousel = ({
  mediaStyle,
  previewFiles,
  style,
  controlsFontSize = "2rem",

  editMode,
}: {
  mediaStyle: CSSProperties;
  previewFiles: previewFile[];
  style?: CSSProperties;
  controlsFontSize?: string | number;

  editMode?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(
    previewFiles[0] ? previewFiles[0].id : 0
  );

  const nextAndPrevButtonsSharedStyles: CSSProperties = {
    alignItems: "center",
    backgroundColor: "transparent",
    width: "fit-content",
    height: "fit-content",
  };

  const [cropping, setCropping] = useState<boolean>(false);

  return (
    previewFiles.length && (
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
                {editMode ? (
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <EditButtons
                      previewFile={previewFile}
                      previewFiles={previewFiles}
                      setCurrentIndex={setCurrentIndex}
                      setCropping={setCropping}
                    />
                  </div>
                ) : null}
                <div
                  style={{
                    position: "relative",

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

                  {cropping ? (
                    <CropMedia
                      mediaStyle={mediaStyle}
                      previewFile={previewFile}
                    />
                  ) : previewFile.type === "image" ? (
                    <img src={previewFile.src} style={mediaStyle} />
                  ) : (
                    <video
                      src={previewFile.src}
                      style={mediaStyle}
                      autoPlay={true}
                    />
                  )}
                </div>
              </div>
            ) : null}
          </>
        ))}
      </div>
    )
  );
};

const EditButtons = ({
  previewFile,
  previewFiles,

  setCurrentIndex,
  setCropping,
}: {
  previewFile: previewFile;
  previewFiles: previewFile[];

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

  const deletePreviewFile = useCreatePostStore(
    (state) => state.deletePreviewFile
  );

  function handleDelete(previewFile: previewFile) {
    deletePreviewFile(previewFile.id);

    const filteredArray = previewFiles.filter(
      (elem) => elem.id !== previewFile.id
    );

    setCurrentIndex(filteredArray[0].id);
  }

  return (
    <div className={styles.buttonsContainer} style={{ zIndex: 2 }}>
      {previewFile.type === "image" && (
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
      )}

      <ScaleHoverButton
        onClick={() => handleDelete(previewFile)}
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
