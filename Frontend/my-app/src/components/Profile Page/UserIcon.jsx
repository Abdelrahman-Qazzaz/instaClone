import axios from "axios";
import React, { useContext, useState } from "react";
import userContext from "../../UserContext";
import CameraIcon from "../assets/CameraIcon";
import styles from "./profilePage.module.css";
import BlackBackground from "../assets/BlackBackground";
import Xicon from "../../components/assets/XIcon";
function UserIcon(props) {
  const { user, setUser, fetchUserData, setIsLoading, deletePFP } =
    useContext(userContext);
  const [src, setSrc] = useState();

  async function removePFP() {
    setIsLoading(true);

    try {
      await deletePFP(user._id);
      const userData = await fetchUserData(user._id);
      setUser({ ...userData });
      togglePFPOptionsScreen();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {}, 3000);
    setIsLoading(false);
  }

  const [showPFPOptionsScreen, setShowPFPOptionsScreen] = useState(false);
  function togglePFPOptionsScreen() {
    setShowPFPOptionsScreen((prev) => !prev);
  }

  const [labelStyle, setLabelStyle] = useState({
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "none",
  });
  function changeLabelStyle() {
    setLabelStyle((prev) => ({ ...prev, cursor: "pointer" }));
  }
  return (
    <>
      <img
        className={styles.responsiveWidth}
        style={{ borderRadius: "50%" }}
        src={props.targetUser.pfpFirebasePathURL ?? "/defaultInstaPFP.jpg"}
        alt="Profile Picture"
      />

      {user._id == props.targetUser._id ? (
        <>
          {!user.pfpFirebasePathURL ? (
            <div
              className={styles.responsiveWidth}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "black",
                borderRadius: "50%",
                opacity: 0.2,
              }}
            ></div>
          ) : null}
          <div
            onClick={togglePFPOptionsScreen}
            onMouseEnter={changeLabelStyle}
            className={`${styles.responsiveWidth} p-0 d-flex justify-content-center align-items-center`}
            style={labelStyle}
          >
            {!user.pfpFirebasePathURL ? <CameraIcon width="40" /> : null}
          </div>
        </>
      ) : null}

      {showPFPOptionsScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "350px",
              aspectRatio: "1/0.5",
              backgroundColor: "white",
              borderRadius: "1rem",
              zIndex: 4,
              position: "relative",
            }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div
              style={{
                position: "absolute",
                top: 0,

                width: "100%",
              }}
              className="d-flex justify-content-end"
            >
              <button onClick={togglePFPOptionsScreen} className="btn">
                <Xicon />
              </button>
            </div>
            <label
              htmlFor="imageInput"
              className="btn border-bottom"
              style={{ width: "100%", fontSize: "1.2rem" }}
            >
              Change Profile Picture
            </label>
            <input
              id="imageInput"
              type="file"
              hidden
              onChange={props.handleUploadPFP}
            />
            <button
              onClick={removePFP}
              className="btn  text-danger"
              style={{ width: "100%", fontSize: "1.2rem" }}
            >
              Remove Profile Picture
            </button>
          </div>
          <BlackBackground />
        </div>
      )}
    </>
  );
}

export default UserIcon;
