import { SideNavbarButtons } from "../NavbarButtons";
import styles from "./SideNavbar.module.css";
export const SideNavbar = () => {
  return (
    <div className={styles.container}>
      {SideNavbarButtons.map((elem) => elem())}
    </div>
  );
};
