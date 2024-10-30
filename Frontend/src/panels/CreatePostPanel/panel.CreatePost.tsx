import styles from "./panel.CreatePost.module.css";

import { Panel } from "@/panels/Panel";
import { useState } from "react";

import { CreatePostPanelSelectMediaSection } from "@/panels/CreatePostPanel/CreatePostPanel Sections/CreatePostPanelSelectMediaSection/panel.section.CreatePostSelectMedia";
import { CreatePostPanelCropMediaSection } from "@/panels/CreatePostPanel/CreatePostPanel Sections/CreatePostPanelCropMediaSection/panel.section.CreatePostCropMedia";

export type previewFile = {
  src: string;
  type: string;
};
export const CreatePostPanel = () => {
  const [fileList, setFileList] = useState<FileList>(new DataTransfer().files);
  const [previewFiles, setPreviewFiles] = useState<previewFile[]>([]);
  const [section, setSection] = useState<
    "SelectMedia" | "CropMedia" | "SetCaption"
  >("SelectMedia");
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
        {section === "SelectMedia" && (
          <CreatePostPanelSelectMediaSection
            fileList={fileList}
            setFileList={setFileList}
            previewFiles={previewFiles}
            setPreviewFiles={setPreviewFiles}
            setSection={setSection}
          />
        )}

        {section === "CropMedia" && (
          <CreatePostPanelCropMediaSection previewFiles={previewFiles} />
        )}
      </div>
    </Panel>
  );
};
