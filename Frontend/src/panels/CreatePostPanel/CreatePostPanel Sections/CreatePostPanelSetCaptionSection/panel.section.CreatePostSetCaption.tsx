import {
  CreatePostSections,
  previewFile,
} from "@/panels/CreatePostPanel/panel.CreatePost";

import styles from "./panel.section.CreatePostSetCaption.module.css";
import { useState } from "react";
import { MediaCarousel } from "@/components/MediaCarousel/MediaCarousel";
import { UserTab } from "@/components/UserTab/UserTab";
import { mockUser } from "@/dev/mockUser";

import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { useCreatePostStore } from "@/store/useCreatePostStore";

export const CreatePostPanelSetCaptionSection = ({
  setSection,
}: {
  setSection: React.Dispatch<React.SetStateAction<CreatePostSections>>;
}) => {
  const previewFiles = useCreatePostStore((state) => state.previewFiles);

  return (
    <div className={styles.container}>
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
      <SetCaptionBody />
    </div>
  );
};

const SetCaptionBody = () => {
  const caption = useCreatePostStore((state) => state.caption);
  const setCaption = useCreatePostStore((state) => state.setCaption);

  const hideLikesCount = useCreatePostStore(
    (state) => state.additionalSettings.getters.hideLikesCount
  );

  const setHideLikesCount = useCreatePostStore(
    (state) => state.additionalSettings.setters.setHideLikesCount
  );

  const disableCommenting = useCreatePostStore(
    (state) => state.additionalSettings.getters.disableCommenting
  );
  const setDisableCommenting = useCreatePostStore(
    (state) => state.additionalSettings.setters.setDisableCommenting
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setCaption(value);
  }

  const [showAdditionalSettings, setShowAdditionalSettings] =
    useState<boolean>(false);

  return (
    <div className={styles.setCaptionBody}>
      <UserTab user={mockUser} />
      <div className={styles.textAreaContainer}>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
          onChange={handleChange}
          value={caption}
        />
      </div>

      <Dropdown
        showChildren={showAdditionalSettings}
        setShowChildren={setShowAdditionalSettings}
        buttonText="Additional Settings"
      >
        <ToggleButton
          value={hideLikesCount}
          setValue={setHideLikesCount}
          text="Hide likes count on this post"
        />
        <ToggleButton
          value={disableCommenting}
          setValue={setDisableCommenting}
          text="Turn off commenting"
        />
      </Dropdown>
    </div>
  );
};
