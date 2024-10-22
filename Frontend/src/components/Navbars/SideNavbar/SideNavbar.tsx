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
  InstaCloneTextLogoButton,
} from "../NavbarButtons";
import { DisplayXLUp } from "@/assets/XL breakpoint/DisplayXLup";
import { DisplayBelowXL } from "@/assets/XL breakpoint/DisplayBelowXL";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar/SearchBar";

export const SideNavbar = () => {
  const [showExtension, setShowExtension] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className="mt-2 mb-3">
          <DisplayBelowXL>
            <InstaCloneNavbarButton />
          </DisplayBelowXL>
          {showExtension && (
            <DisplayXLUp>
              <InstaCloneNavbarButton />
            </DisplayXLUp>
          )}
          {!showExtension && (
            <DisplayXLUp>
              <InstaCloneTextLogoButton />
            </DisplayXLUp>
          )}
        </div>
        <div>
          <HomeNavbarButton
            children={!showExtension && <DisplayXLUp>Home</DisplayXLUp>}
          />
        </div>
        <div>
          <SearchNavbarButton
            onClick={() => setShowExtension((prev) => !prev)}
            children={!showExtension && <DisplayXLUp>Search</DisplayXLUp>}
          />
        </div>
        <div>
          <ExploreNavbarButton
            children={!showExtension && <DisplayXLUp>Explore</DisplayXLUp>}
          />
        </div>
        <div>
          <ReelsNavbarButton
            children={!showExtension && <DisplayXLUp>Reels</DisplayXLUp>}
          />
        </div>
        <div>
          <MessengerNavbarButton
            children={!showExtension && <DisplayXLUp>Messages</DisplayXLUp>}
          />
        </div>
        <div>
          <HeartNavbarButton
            children={
              !showExtension && <DisplayXLUp>Notifications</DisplayXLUp>
            }
          />
        </div>
        <div>
          <PlusInsideSquareNavbarButton
            children={!showExtension && <DisplayXLUp>Create</DisplayXLUp>}
          />
        </div>
        <div>
          <PFPNavbarButton
            children={!showExtension && <DisplayXLUp>Profile</DisplayXLUp>}
          />
        </div>

        <div className="mt-4">
          <ListNavbarButton
            children={!showExtension && <DisplayXLUp>More</DisplayXLUp>}
          />
        </div>
      </div>
      {showExtension && (
        <div className={styles.navbarExtension}>
          <div className="my-3">
            <h5 className={`${styles.text} mt-2 mb-4`}>Search</h5>
            <SearchBar setSearchResults={setSearchResults} />
          </div>
          <div className="w-100 border-top">
            <div className={`${styles.text} mt-3`}>Recent</div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};
