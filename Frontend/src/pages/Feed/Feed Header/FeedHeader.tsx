import { PFPIcon } from "../../../components/PFPIcon/PFPIcon";
import { mockUser } from "../../../dev/MockUser";
import styles from "./FeedHeader.module.css";
export const FeedHeader = () => {
  return (
    <div className={styles.container}>
      <PFPIcon width={"3rem"} user={mockUser} />
    </div>
  );
};
