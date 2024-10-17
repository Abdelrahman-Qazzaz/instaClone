import { Button } from "react-bootstrap";
import { HomeIcon } from "../../icons/Home Icons/icon.Home";
import styles from "./NavbarButtons.module.css";
import { SearchIcon } from "../../icons/Search Icon/SearchIcon";
export const InstaCloneNavbarButton = () => {
  return <div>InstaCloneNavbarButton</div>;
};

export const HomeNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <HomeIcon width={"1.5rem"} />
    </Button>
  );
};

export const SearchNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <SearchIcon width={"1.5rem"} />
    </Button>
  );
};

export const ExploreNavbarButton = () => {
  return <div>InstaCloneNavbarButton</div>;
};
