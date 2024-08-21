import React, { useContext } from "react";

import userContext from "../../UserContext";
import ImagesAndVidsPreviewCarousel from "../ImagesAndVidsPreviewCarousel";
import PostInfo from "./PostInfo";
import styles from "./profilePage.module.css";

function DesktopOnlyPPPSection(props) {
  const { user, toggleSharePostScreen } = useContext(userContext);

  return (
    <div
      className={`${styles.hideForMobile}`}
      style={{
        zIndex: 3,
        border: "",
        maxWidth: "100%",
        width: "600px",
      }}
    >
      <div
        className="d-flex"
        style={{ border: " red", height: "100%", width: "100%" }}
      >
        <div
          className={`${styles.hideForMobile} d-flex align-items-center`}
          style={{ border: "", maxWidth: "450px", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              backgroundColor: "black",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: "0.9",
            }}
          ></div>
          <ImagesAndVidsPreviewCarousel
            forPPP={true}
            slides={props.post.firebasePathURLs}
          />
        </div>
        <PostInfo
          post={props.post}
          setPost={props.setPost}
          owner={props.owner}
          setInput={props.setInput}
          userIsReplying={props.userIsReplying}
          userReplyingToComment_id={props.userReplyingToComment_id}
          handleHeartClick={props.handleHeartClick}
          inputRef={props.inputRef}
          handleChange={props.handleChange}
          input={props.input}
          btnDisable={props.btnDisable}
          btnOpacity={props.btnOpacity}
        />
      </div>
    </div>
  );
}

export default DesktopOnlyPPPSection;

/*
            <div style={{minWidth:'30%',backgroundColor:'white',zIndex:1}} className='d-none d-md-flex flex-column'>
                <div style={{height:'60px'}} className='border-bottom d-flex justify-content-between'>
                    <div style={{width:'400px'}} className='d-flex align-items-center'>
                        <img className='ms-3' width='32px' height='32px' src={post.firebasePathURL} alt="userPFP" style={{borderRadius:'50%'}} />
                        <div className='ms-3' style={{fontWeight:'550'}}>{owner ? owner.username : null}</div>
                    </div>
                    <div className='flex-grow-1  me-3 d-flex align-items-center'><ThreeDots/></div>
                </div>
                <div className='flex-grow-1 mt-1 d-flex flex-column' style={{height:'220px',overflowY:'auto',border:'',width:''}}>
                    {post.caption ? <Caption post={post} owner={owner}/> : null}
                    {post.comments ? post.comments.map((comment)=>(
                        <div className='mt-4'><Comment comment={comment} setInput={setInput} userIsReplying={userIsReplying} userReplyingToComment_id={userReplyingToComment_id} post={post} fetchData={fetchData} fetchPostData={fetchPostData}/></div>
                        )) : null }
                </div>
                <div className='border-top d-flex justify-content-center'>
                    <div style={{width:'90%',border:'',height:'170px'}} className='d-flex flex-column '>
                        <div style={{height:'45px',border:''}} className=' d-flex'>
                            <div style={{flex:1,border:''}} className='d-flex align-items-center'>
                                <button className='p-0' style={{border:'none',backgroundColor:'transparent'}}><BlackHeart/></button>
                                <button className='ms-3 p-0' style={{border:'none',backgroundColor:'transparent'}}><CommentIcon ProfilePagePost={true}/></button>
                                <button className='ms-3 p-0' style={{border:'none',backgroundColor:'transparent'}}><ShareIcon ProfilePagePost={true}/></button>
                            </div>
                            <button style={{width:'24px',border:'none',backgroundColor:'transparent'}} className='d-flex align-items-center p-0'><SavePostIcon/></button>
                        </div>
                        <div style={{height:'15px'}}>{post.likes ? <p className='fw-bold'>{post.likes} likes</p> : <p>Be the first to <button className='p-0'style={{border:'none',backgroundColor:'transparent',fontWeight:'500'}}>like this</button></p> }</div>
                        <div style={{height:'10px',color:'#758694',fontSize:'0.8rem'}} className='mt-2'>November 1</div>
                        <div className='mb-3 flex-grow-1 d-flex align-items-end'><TextField onChange={handleChange} value={input} className='p-0' id="outlined-basic" label="Add a comment..." size="medium" style={{width:'100%'}} InputProps={{endAdornment:(<button disabled={btnDisable} onClick={userIsReplying.current ? ()=>{postReply(reply.current)} : postComment} className='btn text-info fw-bold' style={{opacity:{btnOpacity},fontSize:'13px',border:'none'}}>Post</button>)}}/></div>
                    </div>
                </div>
            </div>
             */
