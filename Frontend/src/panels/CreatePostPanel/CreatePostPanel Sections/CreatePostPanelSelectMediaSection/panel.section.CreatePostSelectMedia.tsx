import {
  CreatePostSections,
  previewFile,
} from "@/panels/CreatePostPanel/panel.CreatePost";

import { Button } from "react-bootstrap";
import { Rotate } from "@/assets/Rotate/Rotate";
import { ImageIcon } from "@/icons/icon.Image";
import { ReelsIcon } from "@/icons/icon.Reels";
import { StackedMedia } from "@/components/StackedMedia/StackedMedia";
import styles from "./panel.section.CreatePostSelectMedia.module.css";
export const CreatePostPanelSelectMediaSection = ({
  previewFiles,
  setPreviewFiles,
  setSection,
}: {
  previewFiles?: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
  setSection: React.Dispatch<React.SetStateAction<CreatePostSections>>;
}) => {
  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) return;

    let tempPreviewFiles: previewFile[] = [];
    if (previewFiles) tempPreviewFiles = [...previewFiles];

    for (let i = 0; i < files.length; i++) {
      //
      const file = files[i];
      const src = URL.createObjectURL(file);
      const type: string = file.type.startsWith("image") ? "image" : "video";
      tempPreviewFiles.push({ id: tempPreviewFiles.length, src, type });
      //
    }

    setPreviewFiles(tempPreviewFiles);
  }

  return (
    <div className={styles.createPostPanelBody}>
      <div className={styles.filesPreview}>
        {previewFiles?.length && (
          <>
            <StackedMedia
              previewFiles={previewFiles}
              setPreviewFiles={setPreviewFiles}
              style={{ position: "absolute", left: 0 }}
            />

            <Button
              className={styles.nextButton}
              style={{ zIndex: 3 }}
              onClick={() => {
                setSection("SetCaption");
              }}
            >
              Next
            </Button>
          </>
        )}
      </div>

      <div className={styles.iconsContainer}>
        <Rotate rotate="-10deg">
          <ImageIcon />
        </Rotate>
        <Rotate rotate="7deg">
          <ReelsIcon />
        </Rotate>
      </div>
      <div className={styles.text}>Drag photos and videos here</div>
      <>
        <label
          className={`btn btn-primary ${styles.selectButton} ${styles.text}`}
          htmlFor="Files"
        >
          Select
        </label>
        <input onChange={handleFile} type="file" id="Files" hidden multiple />
      </>
    </div>
  );
};
