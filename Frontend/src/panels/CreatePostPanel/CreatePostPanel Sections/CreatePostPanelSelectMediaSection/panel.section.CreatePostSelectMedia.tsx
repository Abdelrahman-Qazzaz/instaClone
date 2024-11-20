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
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { BlackBackground } from "@/assets/BlackBackground";
import { useState } from "react";
import { XIconFill } from "@/icons/icon.X";
import { MediaCarousel } from "@/components/MediaCarousel/MediaCarousel";
export const CreatePostPanelSelectMediaSection = ({
  setSection,
}: {
  setSection: React.Dispatch<React.SetStateAction<CreatePostSections>>;
}) => {
  const previewFiles = useCreatePostStore((state) => state.previewFiles);
  const pushPreviewFiles = useCreatePostStore(
    (state) => state.pushPreviewFiles
  );
  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) return;

    let tempPreviewFiles: previewFile[] = [];

    for (let i = 0; i < files.length; i++) {
      //
      const file = files[i];
      const src = URL.createObjectURL(file);
      const type: string = file.type.startsWith("image") ? "image" : "video";
      tempPreviewFiles.push({ id: previewFiles.length, src, type });
      //
    }

    pushPreviewFiles(tempPreviewFiles);
  }

  const [showMediaCarousel, setShowMediaCarousel] = useState<boolean>(false);
  const BlackBackgroundZIndex = 4;

  return (
    <div className={styles.createPostPanelBody}>
      <div className={styles.filesPreview}>
        {previewFiles?.length && (
          <>
            <StackedMedia
              previewFiles={previewFiles}
              onClick={() => {
                setShowMediaCarousel((prev) => !prev);
              }}
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
              alignItems: "center",
            }}
          >
            <BlackBackground
              style={{
                zIndex: BlackBackgroundZIndex,
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            />
            <div
              style={{
                width: "280px",
                display: "flex",
                justifyContent: "end",
              }}
            >
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
              mediaStyle={{
                zIndex: 1,
                objectFit: "contain",
                maxHeight: "300px",
                maxWidth: "300px",
              }}
              previewFiles={previewFiles}
              editMode={true}
              style={{
                zIndex: BlackBackgroundZIndex + 1,
              }}
            />
          </div>
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
      <div className="text">Drag photos and videos here</div>
      <>
        <label
          className={`btn btn-primary ${styles.selectButton} text`}
          htmlFor="Files"
        >
          Select
        </label>
        <input onChange={handleFile} type="file" id="Files" hidden multiple />
      </>
    </div>
  );
};
