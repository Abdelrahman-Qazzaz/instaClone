import React, { useContext, useEffect, useState } from "react";

import userContext from "../../UserContext";
import FollowButton from "../assets/FollowButton";
import RightArrowIcon from "../assets/RightArrowIcon";
import UnfollowButton from "../assets/UnfollowButton";
import styles from "./homePage.module.css";

function SuggestedPage(props) {
  const {
    user,
    fetchSuggestedUsers,
    toggleUnfollowConfirmationScreen,
    setShowSuggestedPage,
  } = useContext(userContext);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [disableBTN, setDisableBTN] = useState(true);

  useEffect(() => {
    setShowSuggestedPage(true);
    setup();
  }, []);

  useEffect(() => {
    if (user.following_ids.length) {
      setDisableBTN(false);
    } else {
      setDisableBTN(true);
    }
  }, [user.following_ids]);

  async function setup() {
    if (user.following_ids.length) {
      setDisableBTN(false);
    }
    const suggestedUsers = props.userList
      ? props.userList
      : await fetchSuggestedUsers(); // for the props.userList, it's not actually for suggestions, it's for the list of following and followers
    setSuggestedUsers(suggestedUsers);
  }
  return (
    <>
      <div
        className={styles.c}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          position: "fixed",
          left: "0",
          display: "flex",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div
          className={`${styles.s} m-2`}
          style={{
            width: "100%",
            maxWidth: "630px",
            position: "relative",
            marginTop: 0,
            top: 0,
          }}
        >
          <div style={{ height: "fit-content" }}>
            <div
              style={{
                height: "fit-content",
              }}
              className="d-flex align-items-center mb-2"
            >
              <text
                style={{
                  fontWeight: "650",
                  height: "100%",

                  flexGrow: 1,
                }}
              >
                Suggested for you
              </text>
              <button
                disabled={disableBTN}
                onClick={() => {
                  if (props.onClick) {
                    props.onClick();
                  }
                  setShowSuggestedPage(false);
                }}
                className="d-flex align-items-center p-0"
                style={{
                  backgroundColor: "transparent",
                  width: "fit-content",
                  height: "100%",
                  display: "flex",
                  justifyContent: "end",
                  opacity: disableBTN ? "0.4" : "1",
                  border: "none",
                  zIndex: 110,
                }}
              >
                <RightArrowIcon width="30px" />
              </button>
            </div>
          </div>

          <div style={{ height: "fit-content" }}>
            {suggestedUsers &&
              suggestedUsers.map((suggestedUser) => (
                <div
                  style={{
                    width: "100%",
                    height: "68px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    width="44px"
                    style={{ borderRadius: "50%" }}
                    className="me-3"
                    src={
                      suggestedUser.pfpFirebasePathURL
                        ? suggestedUser.pfpFirebasePathURL
                        : "/defaultInstaPFP.jpg"
                    }
                    alt="image"
                  />
                  <div
                    className=""
                    style={{
                      width: "70%",
                      height: "52px",

                      flexGrow: 1,
                    }}
                  >
                    <span style={{ height: "18px" }}>
                      <text style={{ fontWeight: "600" }}>
                        {suggestedUser.username}
                      </text>
                    </span>
                  </div>
                  {user.following_ids &&
                  user.following_ids.find(
                    (following_id) => following_id == suggestedUser._id
                  ) ? (
                    <UnfollowButton suggestedUser={suggestedUser} />
                  ) : (
                    <FollowButton suggestedUser={suggestedUser} />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestedPage;
