import styles from "./panel.CreatePost.module.css";

import { Panel } from "@/panels/Panel";
import { useEffect, useState } from "react";

import { CreatePostPanelSelectMediaSection } from "@/panels/CreatePostPanel/CreatePostPanel Sections/CreatePostPanelSelectMediaSection/panel.section.CreatePostSelectMedia";

import { PercentCrop } from "react-image-crop";
import { CreatePostPanelSetCaptionSection } from "@/panels/CreatePostPanel/CreatePostPanel Sections/CreatePostPanelSetCaptionSection/panel.section.CreatePostSetCaption";
import { LeftArrowIcon } from "@/icons/icon.Arrow";
import { ScaleHoverButton } from "@/assets/animations/animation.ScaleHoverButton";
import { usePanelsStore } from "@/store/usePanelsStore";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { api } from "@/api/api";
import { useLoadingStore } from "@/store/useLoadingStore";

export type previewFile = {
  id: number;
  src: string;
  type: string;
  dimensions?: PercentCrop;
};

export type CreatePostSections = "SelectMedia" | "SetCaption";

export const CreatePostPanel = () => {
  const closeAll = usePanelsStore((state) => state.closeAll);
  const [section, setSection] = useState<CreatePostSections>("SelectMedia");
  const [disableShareButton, setDisableShareButton] = useState<boolean>(true);
  const xPadding = "1.5rem";
  const previewFiles = useCreatePostStore((state) => state.previewFiles);
  const caption = useCreatePostStore((state) => state.caption);
  const additionalSettings = useCreatePostStore(
    (state) => state.additionalSettings.getters
  );

  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    return previewFiles.length
      ? setDisableShareButton(false)
      : setDisableShareButton(true);
  }, [previewFiles.length]);

  async function handleShare() {
    setIsLoading(true);
    const [error, post] = await api.posts.sharePost(
      previewFiles,
      caption,
      additionalSettings
    );
    setIsLoading(false);
    if (!error) return closeAll();
  }

  return (
    <Panel>
      <div className={styles.container}>
        <div className={`${styles.header} text`}>
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
          <div className="d-flex align-items-center">
            {section === "SetCaption" && (
              <ScaleHoverButton
                onClick={handleShare}
                disabled={disableShareButton}
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  alignContent: "center",
                  color: "var(--blue)",
                  padding: `0 ${xPadding} 0 ${xPadding}`,
                }}
              >
                Share
              </ScaleHoverButton>
            )}
          </div>
        </div>
        {section === "SelectMedia" && (
          <CreatePostPanelSelectMediaSection setSection={setSection} />
        )}

        {section === "SetCaption" && (
          <CreatePostPanelSetCaptionSection setSection={setSection} />
        )}
      </div>
    </Panel>
  );
};
