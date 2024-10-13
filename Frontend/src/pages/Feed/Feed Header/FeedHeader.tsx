import { PFPIcon } from "../../../components/PFPIcon/PFPIcon";
import styles from "./FeedHeader.module.css";
export const FeedHeader = ({ stories }: { stories?: any }) => {
  return (
    <div className={styles.container}>
      <PFPIcon width={"3rem"} url={"../../../public/cr7.jpg"} />
    </div>
  );
};
