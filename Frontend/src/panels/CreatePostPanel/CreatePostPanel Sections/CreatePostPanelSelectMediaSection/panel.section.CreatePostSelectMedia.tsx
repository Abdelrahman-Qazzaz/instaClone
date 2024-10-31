import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import styles from "./panel.section.CreatePostSelectMedia.module.css";
import { Button } from "react-bootstrap";
import { Rotate } from "@/assets/Rotate/Rotate";
import { ImageIcon } from "@/icons/icon.Image";
import { ReelsIcon } from "@/icons/icon.Reels";

export const CreatePostPanelSelectMediaSection = ({
  previewFiles,
  setPreviewFiles,
  setSection,
}: {
  previewFiles?: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
  setSection: React.Dispatch<
    React.SetStateAction<"SelectMedia" | "CropMedia" | "SetCaption">
  >;
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
            <div>
              {previewFiles.map((objectUrl, idx) => (
                <div
                  style={{
                    position: "absolute",
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
            </div>
            <Button
              style={{ zIndex: 3 }}
              onClick={() => {
                setSection("CropMedia");
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
