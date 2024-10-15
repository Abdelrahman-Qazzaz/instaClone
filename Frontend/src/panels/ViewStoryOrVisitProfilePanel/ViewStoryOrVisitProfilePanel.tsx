import { Button } from "react-bootstrap";
import { FixedPosPage } from "../../assets/FixedPosPage";
import styles from "./ViewStoryOrVisitProfilePanel.module.css";

export const ViewStoryOrVisitProfilePanel = () => {
  return (
    <FixedPosPage center={true}>
      <div className={`border bg-white ${styles.container} `}>
        <Button className="bg-transparent border-0 border-bottom ">
          View Story
        </Button>
        <Button className="bg-transparent border-0">Visit Profile</Button>
      </div>
    </FixedPosPage>
  );
};
