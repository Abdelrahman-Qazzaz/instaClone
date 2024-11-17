import styles from "./panel.CreatePost.module.css";

import { Panel } from "@/panels/Panel";
import { useState } from "react";

import { CreatePostPanelSelectMediaSection } from "@/panels/CreatePostPanel/CreatePostPanel Sections/CreatePostPanelSelectMediaSection/panel.section.CreatePostSelectMedia";

import { PercentCrop } from "react-image-crop";
import { CreatePostPanelSetCaptionSection } from "@/panels/CreatePostPanel/CreatePostPanel Sections/CreatePostPanelSetCaptionSection/panel.section.CreatePostSetCaption";
import { LeftArrowIcon } from "@/icons/icon.Arrow";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { usePanelsStore } from "@/store/usePanelsStore";

export type previewFile = {
  id: number;
  src: string;
  type: string;
  dimensions?: PercentCrop;
};

export type CreatePostSections = "SelectMedia" | "SetCaption";

export const CreatePostPanel = () => {
  const closeAll = usePanelsStore((state) => state.closeAll);
  const [previewFiles, setPreviewFiles] = useState<previewFile[]>([]);
  const [section, setSection] = useState<CreatePostSections>("SelectMedia");
  const xPadding = "1.5rem";
  /*
  const formData = new FormData();
   formData.append('files', files[i])
  */

  return (
    <Panel>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.text}`}>
          <ScaleHoverButton
            style={{
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              padding: `0 ${xPadding} 0 ${xPadding}`,
            }}
            onClick={() => {
              setSection((prev) => {
                if (prev === "SelectMedia") {
                  closeAll();
                }
                if (prev === "SetCaption") return "SelectMedia";

                return "SetCaption";
              });
            }}
          >
            <LeftArrowIcon fontSize={"1.6rem"} />
          </ScaleHoverButton>
          <div className="d-flex justify-content-center align-items-center">
            Create new post
          </div>
          <div>
            {section === "SetCaption" && (
              <ScaleHoverButton
                onClick={() => {}}
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  alignContent: "center",
                  color: "var(--navy)",
                  padding: `0 ${xPadding} 0 ${xPadding}`,
                }}
              >
                Share
              </ScaleHoverButton>
            )}
          </div>
        </div>
        {section === "SelectMedia" && (
          <CreatePostPanelSelectMediaSection
            previewFiles={previewFiles}
            setPreviewFiles={setPreviewFiles}
            setSection={setSection}
          />
        )}

        {section === "SetCaption" && (
          <CreatePostPanelSetCaptionSection
            previewFiles={previewFiles}
            setPreviewFiles={setPreviewFiles}
            setSection={setSection}
          />
        )}
      </div>
    </Panel>
  );
};
