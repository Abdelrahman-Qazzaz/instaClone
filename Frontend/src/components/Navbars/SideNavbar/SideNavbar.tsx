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
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SlideInLeftToRight } from "@/assets/animations/SlideInComponents";
import { SideNavbarSearchExtension } from "@/components/Navbars/SideNavbar/SideNavbar Extensions/SideNavbarSearchExtension/SideNavbarSearchExtension";
import { SideNavbarNotisExtension } from "@/components/Navbars/SideNavbar/SideNavbar Extensions/SideNavbarNotificationsExtension/SideNavbarNotisExtension";

export const SideNavbar = () => {
  const [showSearchExtension, setShowSearchExtension] = useState(false);
  const [showNotisExtension, setShowNotisExtension] = useState(false);
  const showExtension = showSearchExtension || showNotisExtension;

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
            onClick={() => {
              setShowNotisExtension(false);
              setShowSearchExtension((prev) => !prev);
            }}
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
            onClick={() => {
              setShowSearchExtension(false);
              setShowNotisExtension((prev) => !prev);
            }}
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

      <AnimatePresence>
        {showSearchExtension && (
          <SlideInLeftToRight style={{ height: "100%" }}>
            <SideNavbarSearchExtension />
          </SlideInLeftToRight>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNotisExtension && (
          <SlideInLeftToRight style={{ height: "100%" }}>
            <SideNavbarNotisExtension />
          </SlideInLeftToRight>
        )}
      </AnimatePresence>
    </div>
  );
};
