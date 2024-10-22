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
import { InstaCloneTextLogo } from "@/components/InstaCloneTextLogo/InstaCloneTextLogo";
import { ReactNode } from "react";

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

export const InstaCloneTextLogoButton = () => {
  const customNav = useCustomNavigate();
  return (
    <Button className={styles.navbarButton} onClick={customNav.goToRoot}>
      <InstaCloneTextLogo fontSize="1.4rem" />
    </Button>
  );
};

export const HomeNavbarButton = ({ children }: { children?: ReactNode }) => {
  const customNav = useCustomNavigate();
  return (
    <Button className={styles.navbarButton} onClick={customNav.goToRoot}>
      <HomeIcon />
      {children ?? null}
    </Button>
  );
};

export const SearchNavbarButton = ({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button onClick={onClick} className={styles.navbarButton}>
      <SearchIcon />
      {children ?? null}
    </Button>
  );
};

export const ExploreNavbarButton = ({ children }: { children?: ReactNode }) => {
  const customNav = useCustomNavigate();
  return (
    <Button onClick={customNav.goToExplore} className={styles.navbarButton}>
      <ExploreIcon />
      {children ?? null}
    </Button>
  );
};

export const ReelsNavbarButton = ({ children }: { children?: ReactNode }) => {
  const customNav = useCustomNavigate();
  return (
    <Button onClick={customNav.goToReels} className={styles.navbarButton}>
      <ReelsIcon />
      {children ?? null}
    </Button>
  );
};

export const MessengerNavbarButton = ({
  children,
}: {
  children: ReactNode;
}) => {
  const customNav = useCustomNavigate();
  return (
    <Button onClick={customNav.goToChats} className={styles.navbarButton}>
      <MessengerIcon />
      {children ?? null}
    </Button>
  );
};

export const HeartNavbarButton = ({ children }: { children?: ReactNode }) => {
  return (
    <Button className={styles.navbarButton}>
      <HeartIcon />
      {children ?? null}
    </Button>
  );
};

export const PlusInsideSquareNavbarButton = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Button className={styles.navbarButton}>
      <PlusInsideSquareIcon />
      {children ?? null}
    </Button>
  );
};

export const ListNavbarButton = ({ children }: { children?: ReactNode }) => {
  return (
    <Button className={styles.navbarButton}>
      <ListIcon />
      {children ?? null}
    </Button>
  );
};

export const PFPNavbarButton = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={styles.navbarButton}
      onClick={() => navigate(`/users/${mockUser.id}`)}
    >
      {NavBarPFPIcon()}
      {children ?? null}
    </Button>
  );
};
