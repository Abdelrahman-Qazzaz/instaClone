import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import styles from "./StackedMedia.module.css";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { CSSProperties } from "react";

export const StackedMedia = ({
  previewFiles,
  onClick,
  style,
}: {
  previewFiles: previewFile[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}) => {
  return (
    <>
      <ScaleHoverButton
        onClick={onClick}
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
    </>
  );
};
