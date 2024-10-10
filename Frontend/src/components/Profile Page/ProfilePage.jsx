import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../../UserContext";
import styles from "../../rest.module.css";
import NotFoundPage from "../NotFoundPage";
import LeftArrowIcon from "../assets/LeftArrowIcon";
import UserContent from "./UserContent";
import UserDetails from "./UserDetails";
import { localStorageGetItem, localStorageSetItem } from "../../LocalStorage";

function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();

  const [targetUser, setTargetUser] = useState(null);
  const { user, setUser, isLoading, setIsLoading, config } =
    useContext(userContext);
  const [showNotFound, setShowNotFound] = useState(false);

  async function fetchTargetUserData(pfpUpload = false) {
    setIsLoading(true);

    const username = params["*"].split("/")[0];

    const cachedTargetUser = await localStorageGetItem(username, 1000 * 60 * 5);
    if (cachedTargetUser) {
      console.log(cachedTargetUser);
      setTargetUser(cachedTargetUser);
    } else {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKENDAPI}/${username}/`,
          config
        );

        if (data.targetUser) {
          setTargetUser({ ...data.targetUser });

          localStorageSetItem(username, { data: { ...data.targetUser } });
        } else if (data.user) {
          setTargetUser({ ...data.user });
          if (pfpUpload) {
            setUser({ ...data.user });
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response?.status == 401) {
          navigate("/");
        } else {
          navigate("/notFound");
        }
      }
    }
    setIsLoading(false);
  }

  function manageTimer() {
    if (showNotFound) {
      setShowNotFound(false);
    }
    setTimeout(() => {
      setShowNotFound(true);
    }, 2000);
  }
  useEffect(() => {
    fetchTargetUserData();
    manageTimer();
  }, []);
  useEffect(() => {
    fetchTargetUserData();
    manageTimer();
  }, [params["*"]]);
  useEffect(() => {
    // for when on your own profile page.
    if (targetUser?._id == user._id) {
      fetchTargetUserData();
      manageTimer();
    }
  }, [user.posts_ids]);

  //

  //

  return isLoading ? null : !targetUser ? (
    showNotFound ? (
      <NotFoundPage />
    ) : (
      <></>
    )
  ) : (
    <>
      <div
        className={`${styles.adjustPoisitionProfilePage} d-flex flex-column flex-md-row mx-1`}
        style={{
          minHeight: "100vh",

          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <div
          className="d-flex d-md-none justify-content-between align-items-center border-bottom py-2"
          style={{ border: "", width: "" }}
        >
          <div style={{ width: "33.33%" }}>
            <button
              onClick={() => navigate("/")}
              className="p-0"
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <LeftArrowIcon />
            </button>
          </div>
          <div
            style={{ width: "33.33%", fontWeight: "650" }}
            className="text-center"
          >
            {targetUser.username}
          </div>
          <div style={{ width: "33.33%" }}></div>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ border: " green", flex: 1 }}
        >
          <div
            className="d-flex flex-column flex-grow-1"
            style={{ maxWidth: "935px", border: "" }}
          >
            <UserDetails
              targetUser={targetUser}
              setTargetUser={setTargetUser}
              fetchTargetUserData={fetchTargetUserData}
            />
            <UserContent targetUser={targetUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
