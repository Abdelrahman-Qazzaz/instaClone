import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../UserContext";
import Caption from "../Caption";
import ImagesAndVidsPreviewCarousel from "../ImagesAndVidsPreviewCarousel";
import BlackHeart from "./BlackHeart";
import CommentIcon from "./CommentIcon";
import PopUpHeart from "./PopUpHeart";
import RedHeart from "./RedHeart";
import SavePostIcon from "./SavePostIcon";
import ShareIcon from "./ShareIcon";
import UnsavePostIcon from "./UnsavePostIcon";

function FeedPost(props) {
  const {
    user,
    handlePostLikeUnLikeAndGetTheUpdatedLikesForThisPost,
    savePost,
    toggleSharePostScreen,
  } = useContext(userContext);
  const [firstClick, setFirstClick] = useState(false);
  const [displayPopUpHeart, setDisplayPopUpHeart] = useState(false);
  const navigate = useNavigate();

  async function componentHandleHeartClick() {
    const newLikesForPost =
      await handlePostLikeUnLikeAndGetTheUpdatedLikesForThisPost(
        props.post._id
      );
    const updatedPost = { ...props.post, likes: newLikesForPost };

    props.updateFeedPostsArrayState(updatedPost);
    if (updatedPost.likes.find((like) => like.byUser_id == user._id)) {
      // if the user just liked the post
      setDisplayPopUpHeart(true);
    }
  }

  async function componentHandleOnImageOrVideoClick() {
    if (firstClick) {
      await componentHandleHeartClick();
    } else {
      setFirstClick(true);
      setTimeout(() => {
        setFirstClick(false);
      }, 300);
    }
  }

  return (
    <div
      className="border-top mx-1 pt-1 pb-4 d-flex flex-column"
      style={{ height: "fit-content" }}
    >
      <div
        className="mt-2"
        style={{
          height: "46px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="" style={{ height: "34px", width: "390px" }}>
          <Caption post={props.post} owner={props.post.owner} />
        </div>
      </div>
      <div
        onClick={componentHandleOnImageOrVideoClick}
        style={{ height: "fit-content", border: "", position: "relative" }}
      >
        {displayPopUpHeart ? <PopUpHeart /> : null}
        <ImagesAndVidsPreviewCarousel
          noMargin={true}
          feedPost={true}
          slides={props.post.firebasePathURLs}
        />
      </div>
      {props.chatPostLink ? (
        <div
          style={{ height: "fit-content" }}
          className="py-3 d-flex justify-content-center"
        >
          <button
            onClick={() => navigate("/p/" + props.post._id)}
            className="btn text-light  border-light p-1"
          >
            Preview Post
          </button>
        </div>
      ) : (
        <div className="mt-3" style={{ height: "fit-content", border: "" }}>
          <div
            style={{
              height: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "235px" }}>
              <button
                className="p-0 btn"
                onClick={componentHandleHeartClick}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                {props.post.likes &&
                props.post.likes.find &&
                props.post.likes.find((like) => like.byUser_id == user._id) ? (
                  <RedHeart />
                ) : (
                  <BlackHeart forPost={true} />
                )}
              </button>
              <button
                className="p-0 btn"
                onClick={() => {
                  navigate("p/" + props.post._id);
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  marginLeft: "15px",
                }}
              >
                <CommentIcon />
              </button>
              <button
                onClick={() => toggleSharePostScreen(props.post)}
                className="p-0 btn"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  marginLeft: "15px",
                }}
              >
                <ShareIcon />
              </button>
            </div>
            <div style={{ width: "fit-content" }}>
              <button
                onClick={async () => {
                  await savePost(props.post._id);
                }}
                name="save post"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                {user.savedPosts_ids &&
                user.savedPosts_ids.find(
                  (post_id) => post_id == props.post._id
                ) ? (
                  <UnsavePostIcon />
                ) : (
                  <SavePostIcon />
                )}
              </button>
            </div>
          </div>
          <div style={{ height: "18px" }}>
            <text style={{ fontWeight: "620" }}>
              {props.post.likes
                ? props.post.likes.length +
                  (props.post.likes.length == 1 ? " like" : " likes")
                : "0 likes"}
            </text>
          </div>
          <div
            className="mt-2"
            style={{ height: "36px", wordBreak: "break-word" }}
          >
            <text style={{ fontWeight: "600" }} className="me-2">
              {props.post.owner.username}
            </text>
            {props.post.caption}
          </div>
          {props.post.comments ? (
            <div className="" style={{ height: "18px", opacity: 0.6 }}>
              <button
                className="p-0 btn"
                onClick={() => {
                  navigate("/p/" + props.post._id);
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "none",
                  color: "#758694",
                }}
              >
                View all {props.post.comments.length} comments
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default FeedPost;
