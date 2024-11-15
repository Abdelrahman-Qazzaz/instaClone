import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import styles from "./StackedMedia.module.css";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { CSSProperties, useState } from "react";
import { MediaCarousel } from "@/components/MediaCarousel/MediaCarousel";
import { FixedPosPage } from "@/assets/FixedPosPage/FixedPosPage";
import { BlackBackground } from "@/assets/BlackBackground";
import { XIcon, XIconFill } from "@/icons/icon.X";

export const StackedMedia = ({
  previewFiles,
  setPreviewFiles,
  style,
}: {
  previewFiles: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
  style?: CSSProperties;
}) => {
  const [showMediaCarousel, setShowMediaCarousel] = useState(false);
  function toggleMediaCarousel() {
    setShowMediaCarousel((prev) => !prev);
  }
  const BlackBackgroundZIndex = 4;
  return (
    <>
      <ScaleHoverButton
        onClick={toggleMediaCarousel}
        style={{
          backgroundColor: "transparent",
          width: "fit-content",
          ...style,
        }}
      >
        {previewFiles.map((objectUrl, idx) => (
          <div
            className={styles.mediaContainer}
            style={{
              top: idx * 15,
              left: idx * 10,
            }}
          >
            {objectUrl.type === "image" ? (
              <img src={objectUrl.src} />
            ) : (
              <video src={objectUrl.src} />
            )}
          </div>
        ))}
      </ScaleHoverButton>

      {showMediaCarousel && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <BlackBackground
            style={{
              zIndex: BlackBackgroundZIndex,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              border: "2px solid red",
            }}
          />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <ScaleHoverButton
              style={{
                zIndex: BlackBackgroundZIndex,
                backgroundColor: "transparent",
                width: "fit-content",
                padding: 0,
              }}
              onClick={() => setShowMediaCarousel(false)}
            >
              <XIconFill fontSize={"1.5rem"} />
            </ScaleHoverButton>
          </div>
          <MediaCarousel
            previewFiles={previewFiles}
            setPreviewFiles={setPreviewFiles}
            editMode={true}
            style={{
              zIndex: BlackBackgroundZIndex + 1,
              maxWidth: "100%",
            }}
          ></MediaCarousel>
        </div>
      )}
    </>
  );
};
