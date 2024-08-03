import React, { useContext } from 'react';

import { Outlet } from 'react-router-dom';
import DesktopNavbar from './DesktopNavbars/DesktopNavbar';
import MobileOnlyNavBottom from './MobileNavbars/MobileOnlyNavBottom';
import MobileOnlyNavTop from './MobileNavbars/MobileOnlyNavTop';
import userContext from './UserContext';
import CreateNewPostScreen from './components/Profile Page/CreateNewPostScreen';
import SharePostScreen from './components/SharePostScreen';
import SwitchScreen from './components/SwitchScreen';
import BlackBackground from './components/assets/BlackBackground';
import UnfollowConfirmationScreen from './components/assets/Confirmation Screens/UnfollowConfirmationScreen';
import Loading from './components/assets/Loading';
import styles from "./rest.module.css";
function Layout() {

  const { isLoading,showSwitchScreen,showCreateNewPostScreen,showSharePostScreen,showUnfollowConfirmationScreen,sharePostScreenPostData,unfollowConfirmationScreenTargetUser,showBlackBackGround } = useContext(userContext)

  return (
    <>


    {/*order matters for zIndex.*/}

  
    <div className={`${styles.adjustPoisition}`}>
        <Outlet/>
    </div>

    <MobileOnlyNavTop/>  <DesktopNavbar/> <MobileOnlyNavBottom/>

    {showBlackBackGround ? <BlackBackground/> : null}
    {isLoading ? <Loading/> : null}

    {showSwitchScreen ? <SwitchScreen/> : null}
    {showCreateNewPostScreen ? <CreateNewPostScreen/> : null}
    {showSharePostScreen ? <SharePostScreen post={sharePostScreenPostData}/> : null}
    {showUnfollowConfirmationScreen ? <UnfollowConfirmationScreen suggestedUser={unfollowConfirmationScreenTargetUser}/> : null}

    </>
  )
}

export default Layout