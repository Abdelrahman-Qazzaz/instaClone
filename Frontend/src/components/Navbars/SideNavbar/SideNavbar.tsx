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
import { SideNavbarNotificationExtension } from "@/components/Navbars/SideNavbar/SideNavbar Extensions/SideNavbarNotificationsExtension/SideNavbarNotificationExtension";

export const SideNavbar = () => {
  const [showExtension, setShowExtension] = useState<boolean>(false);

  const [showSearchExtension, setShowSearchExtension] = useState(false);
  const [showNotificationExtension, setShowNotificationExtension] =
    useState(false);
  const extensionsShowStates = [showSearchExtension, showNotificationExtension];

  useEffect(() => {
    setShowExtension(extensionsShowStates.some((state) => state === true));
  }, extensionsShowStates);

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
            onClick={() => setShowSearchExtension((prev) => !prev)}
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
            onClick={() => setShowNotificationExtension((prev) => !prev)}
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
          <SlideInLeftToRight>
            <SideNavbarSearchExtension />
          </SlideInLeftToRight>
        )}
        {showNotificationExtension && (
          <SlideInLeftToRight>
            <SideNavbarNotificationExtension />
          </SlideInLeftToRight>
        )}
      </AnimatePresence>
    </div>
  );
};
