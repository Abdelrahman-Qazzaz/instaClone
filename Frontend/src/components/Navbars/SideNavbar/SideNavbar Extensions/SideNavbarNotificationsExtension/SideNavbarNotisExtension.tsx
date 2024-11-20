import { HeartIcon } from "@/icons/icon.Heart";
import styles from "./SideNavbarNotisExtension.module.css";

export const SideNavbarNotisExtension = () => {
  return (
    <div className={styles.SideNavbarNotisExtension}>
      <div className="my-3">
        <h5 className={`text mt-2 mb-4`}>Notifications</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div style={{ borderRadius: "50%" }} className={styles.heartBorder}>
          <HeartIcon fontSize="35px" />
        </div>
        <div className={`mb-3 text ${styles.subText}`}>
          Activity On Your Posts
        </div>
        <div className={`text ${styles.subText}`}>
          When someone likes or comments on one of your posts, you'll see it
          here.
        </div>
      </div>
    </div>
  );
};
