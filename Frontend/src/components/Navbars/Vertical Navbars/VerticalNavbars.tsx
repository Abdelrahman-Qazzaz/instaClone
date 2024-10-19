import { BottomNavbarButtons, TopNavbarButtons } from "../NavbarButtons";
import styles from "./VerticalNavbars.module.css";

export const TopNavBar = () => {
  return (
    <div className={`${styles.navbar} ${styles.topNavbar}`}>
      {TopNavbarButtons.map((elem) => elem())}
    </div>
  );
};

export const BottomNavBar = () => {
  return (
    <div className={`${styles.navbar} ${styles.bottomNavbar}`}>
      {BottomNavbarButtons.map((elem) => elem())}
    </div>
  );
};
