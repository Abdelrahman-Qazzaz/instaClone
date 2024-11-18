import {
  CreatePostSections,
  previewFile,
} from "@/panels/CreatePostPanel/panel.CreatePost";

import styles from "./panel.section.CreatePostSetCaption.module.css";
import { useState } from "react";
import { MediaCarousel } from "@/components/MediaCarousel/MediaCarousel";
import { UserTab } from "@/components/UserTab/UserTab";
import { mockUser } from "@/dev/mockUser";

import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "@/components/Dropdown/Dropdown";

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
  const [showAdditionalSettings, setShowAdditionalSettings] =
    useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div style={{ width: "50%" }}>
        <MediaCarousel
          mediaStyle={{
            zIndex: 1,
            objectFit: "contain",
            height: "300px",
            width: "100%",
          }}
          style={{ width: "100%", height: "100%", backgroundColor: "black" }}
          previewFiles={previewFiles}
          controlsFontSize={"1.5rem"}
        />
      </div>
      <div className={styles.setCaptionBody}>
        <UserTab user={mockUser} />
        <div className={styles.textAreaContainer}>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
          ></textarea>
        </div>
        <div className={styles.additionalSettings}>
          <Dropdown
            showChildren={showAdditionalSettings}
            setShowChildren={setShowAdditionalSettings}
            buttonText="Additional Settings"
          >
            <div style={{ border: "2px solid red" }}>...</div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
