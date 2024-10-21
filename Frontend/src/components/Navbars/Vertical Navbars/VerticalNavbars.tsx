import { SearchBar } from "@/components/SearchBar/SearchBar";
import {
  ExploreNavbarButton,
  HeartNavbarButton,
  HomeNavbarButton,
  InstaCloneNavbarButton,
  MessengerNavbarButton,
  PFPNavbarButton,
  PlusInsideSquareNavbarButton,
  ReelsNavbarButton,
} from "../NavbarButtons";
import styles from "./VerticalNavbars.module.css";
import { useState } from "react";
import { UserTab } from "@/components/UserTab/UserTab";
import { mockUser } from "@/dev/mockUser";

export const TopNavBar = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <>
      <div className={`${styles.navbar} ${styles.topNavbar}`}>
        <div className={styles.flex}>
          <InstaCloneNavbarButton />
          <SearchBar setSearchResults={setSearchResults} />
          <HeartNavbarButton />
        </div>
        <div className="w-100 d-flex flex-column gap-1 align-items-center">
          {searchResults.length
            ? searchResults.map((elem, idx) => (
                <UserTab key={idx} user={elem} />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export const BottomNavBar = () => {
  return (
    <div className={`${styles.navbar} ${styles.bottomNavbar}`}>
      <div className={styles.flex}>
        <HomeNavbarButton />
        <ExploreNavbarButton />
        <ReelsNavbarButton />
        <PlusInsideSquareNavbarButton />
        <MessengerNavbarButton />
        <PFPNavbarButton />
      </div>
    </div>
  );
};
