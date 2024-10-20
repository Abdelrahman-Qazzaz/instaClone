import { PFPIcon } from "@/components/PFPIcon/PFPIcon";
import styles from "./UserTab.module.css";
import { Button } from "react-bootstrap";
import { useCustomNavigate } from "@/hooks/useCustomNavigate";

export const UserTab = (props: {
  user: {
    id: number;
    username: string;
    pfp_url: string;
  };
}) => {
  const navigate = useCustomNavigate();
  return (
    <div className={styles.container}>
      <div className="ms-1 me-3">
        <PFPIcon user={props.user} width={"2.5rem"} />
      </div>
      <Button
        onClick={() => navigate.goToUserId(props.user.id)}
        className="p-0 m-0 bg-transparent border-0 text-start"
      >
        {props.user.username}
      </Button>
    </div>
  );
};
