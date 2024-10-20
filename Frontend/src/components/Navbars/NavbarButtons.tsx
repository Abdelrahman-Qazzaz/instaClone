import { Button } from "react-bootstrap";
import { HomeIcon } from "../../icons/icon.Home";
import styles from "./NavbarButtons.module.css";
import { SearchIcon } from "../../icons/icon.Search";
import { ExploreIcon } from "../../icons/icon.Explore";
import { InstaCloneIcon } from "../../icons/Icon.InstaClone";
import { MessengerIcon } from "../../icons/icon.Messenger";
import { HeartIcon } from "../../icons/icon.Heart";
import { PlusInsideSquareIcon } from "../../icons/icon.PlusInsideSquare";
import { ListIcon } from "../../icons/icon.List";
import { ReelsIcon } from "../../icons/icon.Reels";

import { useNavigate } from "react-router-dom";
import { mockUser } from "@/dev/mockUser";
import { useCustomNavigate } from "@/hooks/useCustomNavigate";

export const NavBarPFPIcon = () => {
  return (
    <i style={{ borderRadius: "50%", overflow: "hidden" }}>
      <img src={mockUser.pfp_url} alt="Profile" />
    </i>
  );
};

export const InstaCloneNavbarButton = () => {
  const customNav = useCustomNavigate();
  return (
    <Button className={styles.navbarButton} onClick={customNav.goToRoot}>
      <InstaCloneIcon />
    </Button>
  );
};

export const HomeNavbarButton = () => {
  const customNav = useCustomNavigate();
  return (
    <Button className={styles.navbarButton} onClick={customNav.goToRoot}>
      <HomeIcon />
    </Button>
  );
};

export const SearchNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <SearchIcon />
    </Button>
  );
};

export const ExploreNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <ExploreIcon />
    </Button>
  );
};

export const ReelsNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <ReelsIcon />
    </Button>
  );
};

export const MessengerNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <MessengerIcon />
    </Button>
  );
};

export const HeartNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <HeartIcon />
    </Button>
  );
};

export const PlusInsideSquareNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <PlusInsideSquareIcon />
    </Button>
  );
};

export const ListNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <ListIcon />
    </Button>
  );
};

export const PFPNavbarButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      className={styles.navbarButton}
      onClick={() => navigate(`/users/${mockUser.id}`)}
    >
      {NavBarPFPIcon()}
    </Button>
  );
};
