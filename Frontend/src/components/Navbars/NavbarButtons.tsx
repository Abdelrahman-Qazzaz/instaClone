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

const NavBarPFPIcon = () => {
  return (
    <i>
      <img src={mockUser.pfp_url} alt="Profile" />
    </i>
  );
};

const InstaCloneNavbarButton = () => {
  const navigate = useNavigate();
  return (
    <Button className={styles.navbarButton} onClick={() => navigate("/")}>
      <InstaCloneIcon />
    </Button>
  );
};

const HomeNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <HomeIcon />
    </Button>
  );
};

const SearchNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <SearchIcon />
    </Button>
  );
};

const ExploreNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <ExploreIcon />
    </Button>
  );
};

const ReelsNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <ReelsIcon />
    </Button>
  );
};

const MessengerNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <MessengerIcon />
    </Button>
  );
};

const HeartNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <HeartIcon />
    </Button>
  );
};

const PlusInsideSquareNavbarButton = () => {
  return (
    <Button className={styles.navbarButton}>
      <PlusInsideSquareIcon />
    </Button>
  );
};

const ListNavbarButton = () => {
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

type JSXElementFunc = () => JSX.Element;
export const SideNavbarButtons: JSXElementFunc[] = [
  InstaCloneNavbarButton,
  HomeNavbarButton,
  SearchNavbarButton,
  ExploreNavbarButton,
  ReelsNavbarButton,
  MessengerNavbarButton,
  HeartNavbarButton,
  PlusInsideSquareNavbarButton,
  PFPNavbarButton,
  ListNavbarButton,
];

export const TopNavbarButtons: JSXElementFunc[] = [
  InstaCloneNavbarButton,
  HeartNavbarButton,
];

export const BottomNavbarButtons: JSXElementFunc[] = [
  HomeNavbarButton,
  ExploreNavbarButton,
  ReelsNavbarButton,
  PlusInsideSquareNavbarButton,
  MessengerNavbarButton,
];
