import styles from "./SideNavbar.module.css";

import {
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
} from "../NavbarButtons";

export const SideNavbar = () => {
  return (
    <div className={styles.container}>
      <InstaCloneNavbarButton />
      <HomeNavbarButton />
      <SearchNavbarButton />
      <ExploreNavbarButton />
      <ReelsNavbarButton />
      <MessengerNavbarButton />
      <HeartNavbarButton />
      <PlusInsideSquareNavbarButton />
      <PFPNavbarButton />
      <ListNavbarButton />
    </div>
  );
};
