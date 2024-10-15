import { api } from "../../api/api";
import { usePanelsStore } from "../../store";
import styles from "./PFPIcon.module.css";
import { useNavigate } from "react-router-dom";

export const PFPIcon = ({
  width,
  user,
}: {
  width: number | string;
  user: { id: number; pfp_url: string };
}) => {
  const navigate = useNavigate();

  const toggleviewStoryOrVisitProfilePanel = usePanelsStore(
    (state) => state.viewStoryOrVisitProfilePanel.toggle
  );

  async function handleClick() {
    const [error, stories] = await api.stories.getByUserId(user.id);
    const hasStories = stories && stories.length ? true : false;
    // if (error || !hasStories) return navigate(`/users/${user.id}`);

    toggleviewStoryOrVisitProfilePanel();
  }

  return (
    <div
      onClick={handleClick}
      className={styles.storyIcon}
      style={{
        width,
        height: width,
        padding: `calc(${width} / 100)`,
      }}
    >
      <div
        className={styles.innerStoryIcon}
        style={{ border: `calc(${width}/30) solid white` }}
      >
        <img src={user.pfp_url} alt="Profile" />
      </div>
    </div>
  );
};
