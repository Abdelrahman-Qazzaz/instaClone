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

export const SideNavbar = () => {
  const [showExtension, setShowExtension] = useState<boolean>(false);
  return (
    <div className={styles.container}>
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
        <HomeNavbarButton />
        {!showExtension && <DisplayXLUp>Home</DisplayXLUp>}
      </div>
      <div>
        <SearchNavbarButton onClick={() => setShowExtension((prev) => !prev)} />
        {!showExtension && <DisplayXLUp>Search</DisplayXLUp>}
      </div>
      <div>
        <ExploreNavbarButton />

        {!showExtension && <DisplayXLUp>Explore</DisplayXLUp>}
      </div>
      <div>
        <ReelsNavbarButton />
        {!showExtension && <DisplayXLUp>Reels</DisplayXLUp>}
      </div>
      <div>
        <MessengerNavbarButton />
        {!showExtension && <DisplayXLUp>Messages</DisplayXLUp>}
      </div>
      <div>
        <HeartNavbarButton />
        {!showExtension && <DisplayXLUp>Notifications</DisplayXLUp>}
      </div>
      <div>
        <PlusInsideSquareNavbarButton />
        {!showExtension && <DisplayXLUp>Create</DisplayXLUp>}
      </div>
      <div>
        <PFPNavbarButton />
        {!showExtension && <DisplayXLUp>Profile</DisplayXLUp>}
      </div>

      <div className="mt-4">
        <ListNavbarButton />
        {!showExtension && <DisplayXLUp>More</DisplayXLUp>}
      </div>
    </div>
  );
};
