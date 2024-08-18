import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home Page/HomePage";
import LoginPage from "./components/Login Page/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
import ProfilePage from "./components/Profile Page/ProfilePage";
import SignupPage from "./components/Signup Page/SignupPage";
import userContext from "./UserContext";

import Explore from "./components/Explore Page/Explore";
import Inbox from "./components/Inbox";
import ProfilePagePost from "./components/Profile Page/ProfilePagePost";
import StoryPreview from "./components/StoriesPreview";
import Layout from "./Layout";
import styles from "./rest.module.css";
import { AnimatePresence, motion } from "framer-motion";
import CheckoutMyOtherProjects from "./CheckoutMyOtherProjects";
function Rest() {
  const { user } = useContext(userContext);
  const [showCheckOutMyOtherProjects, setShowCheckOutMyOtherProjects] =
    useState(true);
  useEffect(() => {
    setInterval(() => {
      setShowCheckOutMyOtherProjects(true);
    }, 1000 * 60 * 5);
  }, []);
  /*
    to do:
    1.remove any anchor tag, and use useNavigate instead.
    2.refactor
    */

  return (
    //   fix story so that it navigates correctly
    //   fix axios requests from localhost4000 to a url that you get from either a .env or just the context
    <>
      <AnimatePresence>
        {showCheckOutMyOtherProjects && (
          <>
            <div
              style={{
                position: "fixed",
                height: "100vh",
                width: "100vw",
                top: 0,
                left: 0,
                backgroundColor: "black",
                opacity: "0.6",
                zIndex: 5,
              }}
            ></div>
            <motion.div
              initial={{ y: "-350px" }}
              animate={{ y: 0 }}
              exit={{ y: "-350px" }}
              transition={{ duration: "0.5", type: "spring", stiffness: 100 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                zIndex: 999,
              }}
            >
              <CheckoutMyOtherProjects
                setShowCheckOutMyOtherProjects={setShowCheckOutMyOtherProjects}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div
        className={styles.fadeFromOutToIn}
        style={{ minHeight: "100vh", position: "relative" }}
      >
        <BrowserRouter>
          <Routes>
            {user._id === -1 || !user ? (
              <>
                <Route path="*" element={<LoginPage />} />
                <Route path="/accounts/emailsignup" element={<SignupPage />} />
                <Route path="/p/*" element={<ProfilePagePost />} />{" "}
                {/*  done removing anchors*/}
              </>
            ) : (
              <>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />{" "}
                  {/*done removiong anchors, (for now) done refactoring */}
                  <Route
                    path="/accounts/emailsignup"
                    element={<SignupPage />}
                  />{" "}
                  {/*done removing anchors*/}
                  <Route path="/explore" element={<Explore />} />{" "}
                  {/* done removing anchors,done refactoring */}
                  <Route path="/direct/inbox/*" element={<Inbox />} />{" "}
                  {/* done removing anchors, PS : for exit chat socket events, do them via the useEffect clean up*/}
                  <Route path="/notFound" element={<NotFoundPage />} />{" "}
                  {/* done removing anchors*/}
                  <Route
                    path="/stories/:username"
                    element={<StoryPreview />}
                  />{" "}
                  {/*  done removing anchors, done refactoring? it's mediocre*/}
                  <Route path="/p/*" element={<ProfilePagePost />} />{" "}
                  {/*  done removing anchors*/}
                  <Route path="*" element={<ProfilePage />} />{" "}
                  {/* done removing anchors */}
                </Route>
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Rest;
