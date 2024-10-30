import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import styles from "./panel.section.CreatePostCropMedia.module.css";

export const CreatePostPanelCropMediaSection = ({
  previewFiles,
}: {
  previewFiles: previewFile[];
}) => {
  const [crop, setCrop] = useState<Crop>();
  return (
    <div className={styles.container}>
      {previewFiles.map((previewFile) => (
        <ReactCrop
          className={styles.ReactCrop}
          crop={crop}
          onChange={(c) => setCrop(c)}
        >
          {previewFile.type === "image" && <img src={previewFile.src} />}
          {previewFile.type === "video" && <video src={previewFile.src} />}
        </ReactCrop>
      ))}
    </div>
  );
};
