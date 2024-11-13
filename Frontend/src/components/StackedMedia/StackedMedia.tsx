import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import styles from "./StackedMedia.module.css";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";

export const StackedMedia = ({
  previewFiles,
  setPreviewFiles,
}: {
  previewFiles: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
}) => {
  return (
    <ScaleHoverButton
      onClick={() => {}}
      style={{
        position: "relative",
        backgroundColor: "transparent",
        width: "fit-content",
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
  );
};
