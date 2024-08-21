import React, { useContext } from "react";

import UserContext from "../../UserContext";
import Feed from "./Feed";
import SuggestedPage from "./SuggestedPage";

function HomePage() {
  //if the user isnt following anyone

  const { user, showSuggestedPage } = useContext(UserContext);

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "2px solid red",
      }}
    >
      {user.following.length && !showSuggestedPage ? (
        <Feed />
      ) : (
        <SuggestedPage />
      )}
    </div>
  );
}

export default HomePage;
