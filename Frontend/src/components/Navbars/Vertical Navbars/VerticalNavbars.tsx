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
import { useEffect, useRef, useState } from "react";
import { UserTab } from "@/components/UserTab/UserTab";
import { mockUser } from "@/dev/mockUser";
import { useOffsetStore } from "@/store/useOffsetStore";
import { useCustomNavigate } from "@/hooks/useCustomNavigate";

export const TopNavBar = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateOffset } = useOffsetStore((store) => store);
  const useCustomNav = useCustomNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) updateOffset({ marginTop: ref.current.clientHeight });
    };

    const observer = new ResizeObserver(handleResize);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      updateOffset({ marginTop: 0 });
    };
  }, []);

  return (
    <>
      <div ref={ref} className={`${styles.navbar} ${styles.topNavbar}`}>
        <div className={styles.flex}>
          <InstaCloneNavbarButton />
          <SearchBar setSearchResults={setSearchResults} />
          <HeartNavbarButton onClick={useCustomNav.goToNotifications} />
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
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateOffset } = useOffsetStore((store) => store);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) updateOffset({ marginBottom: ref.current.clientHeight });
    };

    const observer = new ResizeObserver(handleResize);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      updateOffset({ marginBottom: 0 });
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.navbar} ${styles.bottomNavbar}`}>
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
