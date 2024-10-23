import { HeartIcon } from "@/icons/icon.Heart";
import styles from "./SideNavbarNotisExtension.module.css";

export const SideNavbarNotisExtension = () => {
  return (
    <div
      className={styles.navbarNotisExtension}
      style={{ border: "2px solid red" }}
    >
      <div className="my-3">
        <h5 className={`${styles.text} mt-2 mb-4`}>Notifications</h5>
      </div>
      <div className="w-100 d-flex flex-column align-items-center">
        <div style={{ borderRadius: "50%" }} className={styles.heartBorder}>
          <HeartIcon fontSize="35px" />
        </div>
        Activity On Your Posts When someone likes or comments on one of your
        posts, you'll see it here.
      </div>
    </div>
  );
};
