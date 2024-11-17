import {
  CreatePostSections,
  previewFile,
} from "@/panels/CreatePostPanel/panel.CreatePost";

import { Button } from "react-bootstrap";
import { Rotate } from "@/assets/Rotate/Rotate";
import { ImageIcon } from "@/icons/icon.Image";
import { ReelsIcon } from "@/icons/icon.Reels";
import { StackedMedia } from "@/components/StackedMedia/StackedMedia";
import styles from "./panel.section.CreatePostSetCaption.module.css";
import { useState } from "react";
import { MediaCarousel } from "@/components/MediaCarousel/MediaCarousel";

export const CreatePostPanelSetCaptionSection = ({
  previewFiles,
  setPreviewFiles,
  setSection,
}: {
  previewFiles: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
  setSection: React.Dispatch<React.SetStateAction<CreatePostSections>>;
}) => {
  const [caption, setCaption] = useState<string>("");

  return (
    <div className={styles.container}>
      <MediaCarousel
        mediaStyle={{
          zIndex: 1,
          objectFit: "contain",
          height: "300px",
          width: "300px",
        }}
        style={{ width: "50%" }}
        previewFiles={previewFiles}
        controlsFontSize={"1.5rem"}
      />
      <div>set caption</div>
    </div>
  );
};
