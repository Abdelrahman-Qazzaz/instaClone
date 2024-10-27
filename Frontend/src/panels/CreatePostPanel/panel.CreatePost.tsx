import { FixedPosPage } from "@/assets/FixedPosPage/FixedPosPage";
import { ImageIcon } from "@/icons/icon.Image";
import { ReelsIcon } from "@/icons/icon.Reels";
import styles from "./panel.CreatePost.module.css";
import { Rotate } from "@/assets/Rotate/Rotate";
import { Button } from "react-bootstrap";
import { Panel } from "@/panels/Panel";

export const CreatePostPanel = () => {
  return (
    <Panel>
      <div className={styles.container}>
        <div
          className={`${styles.header} ${styles.text} d-flex justify-content-center align-items-center py-2`}
        >
          Create new post
        </div>
        <div className={styles.createPostPanelBody}>
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
            <input type="file" id="Files" hidden multiple />
          </>
        </div>
      </div>
    </Panel>
  );
};
