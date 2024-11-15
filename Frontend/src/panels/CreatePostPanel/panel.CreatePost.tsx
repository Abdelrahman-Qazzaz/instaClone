import styles from "./panel.CreatePost.module.css";

import { Panel } from "@/panels/Panel";
import { useState } from "react";

import { CreatePostPanelSelectMediaSection } from "@/panels/CreatePostPanel/CreatePostPanel Sections/CreatePostPanelSelectMediaSection/panel.section.CreatePostSelectMedia";

import { PercentCrop } from "react-image-crop";

export type previewFile = {
  id: number;
  src: string;
  type: string;
  dimensions?: PercentCrop;
};

export type CreatePostSections = "SelectMedia" | "SetCaption";

export const CreatePostPanel = () => {
  const [previewFiles, setPreviewFiles] = useState<previewFile[]>([]);
  const [section, setSection] = useState<CreatePostSections>("SelectMedia");
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
            previewFiles={previewFiles}
            setPreviewFiles={setPreviewFiles}
            setSection={setSection}
          />
        )}

        {section === "SetCaption" && <></>}
      </div>
    </Panel>
  );
};
