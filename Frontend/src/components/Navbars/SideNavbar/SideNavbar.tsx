import { HomeNavbarButton, SearchNavbarButton } from "../NavbarButtons";
import styles from "./SideNavbar.module.css";
export const MDUpNavBar = () => {
  return (
    <div className={styles.container}>
      <HomeNavbarButton />
      <SearchNavbarButton />
    </div>
  );
};
