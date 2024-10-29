import { ImageIcon } from "@/icons/icon.Image";
import { ReelsIcon } from "@/icons/icon.Reels";
import styles from "./panel.CreatePost.module.css";
import { Rotate } from "@/assets/Rotate/Rotate";
import { Panel } from "@/panels/Panel";
import { useState } from "react";
import { Button } from "react-bootstrap";

type previewFile = {
  src: string;
  type: string;
};
export const CreatePostPanel = () => {
  const [fileList, setFileList] = useState<FileList>(new DataTransfer().files);
  const [previewFiles, setPreviewFiles] = useState<previewFile[]>([]);

  /*
  const formData = new FormData();
   formData.append('files', files[i])
  */

  return (
    <Panel>
      <div className={styles.container}>
        <div
          className={`${styles.header} ${styles.text} d-flex justify-content-center align-items-center py-2`}
        >
          Create new post
        </div>
        {section === "SelectMedia" ? (
          <SelectMediaSection
            fileList={fileList}
            setFileList={setFileList}
            previewFiles={previewFiles}
            setPreviewFiles={setPreviewFiles}
          />
        ) : (
          <></>
        )}
      </div>
    </Panel>
  );
};

const SelectMediaSection = ({
  fileList,
  setFileList,
  previewFiles,
  setPreviewFiles,
}: {
  fileList?: FileList | undefined;
  setFileList: React.Dispatch<React.SetStateAction<FileList>>;
  previewFiles?: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
}) => {
  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) return;
    const dataTransfer = new DataTransfer();
    const previewFiles: { src: string; type: string }[] = [];
    if (fileList)
      for (let i = 0; i < fileList.length; i++) {
        dataTransfer.items.add(fileList[i]);
        //
        const file = fileList[i];
        const src = URL.createObjectURL(file);
        const type: string = file.type.startsWith("image") ? "image" : "video";
        previewFiles.push({ src, type });
        //
      }
    for (let i = 0; i < files.length; i++) {
      dataTransfer.items.add(files[i]);
      //
      const file = files[i];
      const src = URL.createObjectURL(file);
      const type: string = file.type.startsWith("image") ? "image" : "video";
      previewFiles.push({ src, type });
      console.log(previewFiles);
      //
    }

    setFileList(dataTransfer.files);
    setPreviewFiles(previewFiles);
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
            <Button>Next</Button>
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
