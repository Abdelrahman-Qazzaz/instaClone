import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import UserContext from "../../UserContext";
import BlackBackground from "../assets/BlackBackground";
import XIcon from "../assets/XIcon";
import DesktopOnlyPPPSection from "./DesktopOnlyPPPSection";
import MobileOnlyPPPSection from "./MobileOnlyPPPSection";

function ProfilePagePost() {
  const [flag, setFlag] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const [post, setPost] = useState(null);
  const [owner, setOwner] = useState(null);
  const inputRef = useRef(null);

  const [formattedCreationDate, setFormattedCreationDate] = useState(null);
  const {
    handlePostLikeUnLike,
    formatCreationDate,
    user,
    postComment,
    postReply,
    setShowBlackBackground,
  } = useContext(UserContext);
  const [showHeart, setShowHeart] = useState(false);

  async function fetchPostData() {
    const substrings = path.split("/");
    const post_id = substrings[2];
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}`
    );
    console.log(data.targetPost);
    setPost(data.targetPost);
    setOwner(data.targetPost.owner);
  }

  useEffect(() => {
    setShowBlackBackground(true);
    fetchPostData();
    return () => setShowBlackBackground(false);
  }, []);

  useEffect(() => {
    if (post) {
      setFormattedCreationDate(formatCreationDate(post.creationDate));
    }
  }, [post]);

  /*
    .square-element {
  width: 100px; 
  height: auto;  
  aspect-ratio: 1 / 1;
}
    */

  async function handleHeartClick() {
    if (post.likes && post.likes.find((like) => like.byUser_id == user._id)) {
      setShowHeart(false);
    } else {
      setShowHeart(true);
    }

    const newLikesForPost = await handlePostLikeUnLike(post._id);
    setPost((prev) => ({ ...prev, likes: newLikesForPost }));
  }

  const [firstClick, setFirstClick] = useState(false);
  async function handleOnImageClick() {
    if (!firstClick) {
      // if this is the first click
      setFirstClick(true);
    } else {
      await handleHeartClick();
    }
    setTimeout(() => {
      setFirstClick(false);
    }, 500);
  }

  return post ? (
    <>
      <BlackBackground />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div style={{ position: "fixed", top: "3%", left: "93%", zIndex: 3 }}>
          <button
            className="p-0"
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => navigate(-1)}
          >
            <XIcon ProfilePagePost={true} />
          </button>
        </div>

        <MobileOnlyPPPSection
          post={post}
          setPost={setPost}
          inputRef={inputRef}
          handleHeartClick={handleHeartClick}
          fetchPostData={fetchPostData}
          owner={owner}
          postReply={postReply}
          postComment={postComment}
        />
        <DesktopOnlyPPPSection
          post={post}
          setPost={setPost}
          inputRef={inputRef}
          handleHeartClick={handleHeartClick}
          fetchPostData={fetchPostData}
          owner={owner}
          postReply={postReply}
          postComment={postComment}
        />
      </div>
    </>
  ) : null;
}

export default ProfilePagePost;

/*
<>
   <BlackBackground/>
       <div style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',zIndex:4}} className='d-flex justify-content-center align-items-center'>
        <div style={{position:'fixed',top:'3%',left:'93%'}}>
            <a href={`/${post.owner.username}`}>
                <XIcon ProfilePagePost={true}/>
            </a>
        </div>
            <div className={`${styles.responsiveAspectRatioAndWidthAndFlexDirection} ${styles.mobileOnlyMaxWidth}  d-flex  justify-content-center align-items-center`} style={{border:'red',position:'relative',height:''}} >
            <div className={`${styles.responsiveBackgroundColorAndOpacity} d-none d-md-block`} style={{height:'100%',width:'100%',border:'',position:'absolute',top:0,left:0,zIndex:0}}></div>
                <div onClick={handleOnImageClick} style={{border:'red',zIndex:1,maxWidth:'500px',position:'relative'}} className='d-flex justify-content-center'>
                    {
                    showHeart
                    ?
                    <div className={styles2.popUp} style={{border:''}}>
                        <RedHeart width={'100px'}/>
                    </div>
                    :
                    null
                    }
                    <ImagesAndVidsPreviewCarousel forPPP={true} firebasePathURLs={post.firebasePathURLs}/> 
                    </div>
                    <MobileOnlyPPPSection post={post}  handleHeartClick={handleHeartClick} />
                    <DesktopOnlyPPPSection post={post} inputRef={inputRef} handleHeartClick={handleHeartClick} fetchPostData={fetchPostData} setInput={setInput}  owner={owner} userIsReplying={userIsReplying} userReplyingToComment_id={userReplyingToComment_id} handleChange={handleChange} input={input} btnDisable={btnDisable} postReply={postReply}  postComment={postComment} btnOpacity={btnOpacity}/>
                 </div>
            </div>
         </>
   */
